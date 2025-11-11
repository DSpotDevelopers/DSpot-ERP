import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import * as moment from 'moment';
import {
	IDefaultUser,
	RolesEnum,
	ISeedUsers,
	LanguagesEnum,
	IRole,
	ITenant,
	IUser,
	ComponentLayoutStyleEnum
} from '@gauzy/contracts';
import { getEmailWithPostfix } from '../core/seeds/utils';
import { User } from './user.entity';
import { getUserDummyImage, Role } from '../core';
import { E2E_SUPER_ADMINS, E2E_ADMINS, E2E_EMPLOYEES } from './e2e-users';

export const createE2EAdminUsers = async (
	dataSource: DataSource,
	tenant: ITenant
): Promise<{
	e2eSuperAdminUsers: IUser[];
	e2eAdminUsers: IUser[];
}> => {
	// E2E Super Admin Users
	const _e2eSuperAdminUsers: Promise<IUser[]> = seedE2ESuperAdminUsers(dataSource, tenant);
	// E2E Admin Users
	const _e2eAdminUsers: Promise<IUser[]> = seedE2EAdminUsers(dataSource, tenant);

	const [e2eSuperAdminUsers, e2eAdminUsers] = await Promise.all([_e2eSuperAdminUsers, _e2eAdminUsers]);

	await insertUsers(dataSource, [...e2eSuperAdminUsers, ...e2eAdminUsers]);

	return {
		e2eSuperAdminUsers,
		e2eAdminUsers
	};
};

export const createE2EEmployeesUsers = async (
	dataSource: DataSource,
	tenant: ITenant
): Promise<{ e2eEmployeeUsers: IUser[] }> => {
	// E2E Employee Users
	const _e2eEmployeeUsers: Promise<IUser[]> = seedE2EEmployeeUsers(dataSource, tenant, E2E_EMPLOYEES);
	const [e2eEmployeeUsers] = await Promise.all([_e2eEmployeeUsers]);

	await insertUsers(dataSource, [...e2eEmployeeUsers]);

	return {
		e2eEmployeeUsers
	};
};

const seedE2ESuperAdminUsers = async (dataSource: DataSource, tenant: ITenant): Promise<IUser[]> => {
	const superAdmins: Promise<IUser>[] = [];

	const { id: tenantId } = tenant;
	const superAdminRole = await dataSource.manager.findOneBy(Role, {
		tenantId,
		name: RolesEnum.SUPER_ADMIN
	});

	// Generate E2E super admins
	for (const superAdmin of E2E_SUPER_ADMINS) {
		const superAdminUser: Promise<IUser> = generateE2EUser(superAdmin, superAdminRole, tenant);
		superAdmins.push(superAdminUser);
	}
	return Promise.all(superAdmins);
};

const seedE2EAdminUsers = async (dataSource: DataSource, tenant: ITenant): Promise<IUser[]> => {
	const admins: Promise<IUser>[] = [];

	const { id: tenantId } = tenant;
	const adminRole = await dataSource.manager.findOneBy(Role, {
		tenantId,
		name: RolesEnum.ADMIN
	});

	// Generate E2E admins
	for (const admin of E2E_ADMINS) {
		const adminUser: Promise<IUser> = generateE2EUser(admin, adminRole, tenant);
		admins.push(adminUser);
	}
	return Promise.all(admins);
};

const seedE2EEmployeeUsers = async (dataSource: DataSource, tenant: ITenant, employees: any[]): Promise<IUser[]> => {
	const employeeUsers: Promise<IUser>[] = [];

	const { id: tenantId } = tenant;
	const employeeRole = await dataSource.manager.findOneBy(Role, {
		tenantId,
		name: RolesEnum.EMPLOYEE
	});

	// Generate E2E employee users
	for (const employee of employees) {
		const employeeUser: Promise<IUser> = generateE2EUser(employee, employeeRole, tenant);
		employeeUsers.push(employeeUser);
	}
	return Promise.all(employeeUsers);
};

const generateE2EUser = async (defaultUser: IDefaultUser, role: IRole, tenant: ITenant): Promise<IUser> => {
	const user = new User();
	const { firstName, lastName, email, password, imageUrl, preferredLanguage, preferredComponentLayout } = defaultUser;

	user.email = email;
	user.firstName = firstName;
	user.lastName = lastName;
	user.username = email;
	user.role = role;
	user.tenant = tenant;
	user.hash = await bcrypt.hash(password, 12);
	user.imageUrl = imageUrl || getUserDummyImage(user);
	user.preferredLanguage = preferredLanguage || LanguagesEnum.ENGLISH;
	user.preferredComponentLayout = preferredComponentLayout || ComponentLayoutStyleEnum.TABLE;
	user.emailVerifiedAt = moment().toDate();
	user.isActive = true;

	return user;
};

const insertUsers = async (dataSource: DataSource, users: IUser[]): Promise<void> => {
	for (const user of users) {
		// Check if user already exists by email
		const existingUser = await dataSource.manager.findOneBy(User, {
			email: user.email
		});

		if (!existingUser) {
			// Only insert if user doesn't exist
			await dataSource.manager.save(user);
		}
	}
};
