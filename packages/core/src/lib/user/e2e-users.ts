import { ComponentLayoutStyleEnum, LanguagesEnum } from '@gauzy/contracts';

export const E2E_SUPER_ADMINS = [
	{
		email: 'e2e.admin@dspot.com.pl',
		password: 'admin',
		firstName: 'E2E',
		lastName: 'Admin',
		imageUrl: 'assets/images/avatars/avatar-default.svg',
		preferredLanguage: LanguagesEnum.ENGLISH,
		preferredComponentLayout: ComponentLayoutStyleEnum.TABLE
	}
];

export const E2E_ADMINS = [
	{
		email: 'e2e.local.admin@dspot.com.pl',
		password: 'admin',
		firstName: 'E2E',
		lastName: 'Local Admin',
		imageUrl: 'assets/images/avatars/avatar-default.svg',
		preferredLanguage: LanguagesEnum.ENGLISH,
		preferredComponentLayout: ComponentLayoutStyleEnum.TABLE
	}
];

export const E2E_EMPLOYEES = [
	{
		email: 'e2e.employee@dspot.com.pl',
		password: '123456',
		firstName: 'E2E',
		lastName: 'Employee',
		imageUrl: 'assets/images/avatars/avatar-default.svg',
		startedWorkOn: '2018-03-20',
		employeeLevel: 'A',
		preferredLanguage: LanguagesEnum.ENGLISH,
		preferredComponentLayout: ComponentLayoutStyleEnum.TABLE
	}
];
