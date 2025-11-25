import { MigrationInterface, QueryRunner } from 'typeorm';
import * as chalk from 'chalk';
import { DatabaseTypeEnum } from '@gauzy/config';
import { RolePermissionUtils } from '../../role-permission/utils';

export class MigrateRolePermissions1763105402336 implements MigrationInterface {
	name = 'MigrateRolePermissions1763105402336';

	public async up(queryRunner: QueryRunner): Promise<void> {
		console.log(chalk.yellow(`${this.constructor.name} start running!`));

		switch (queryRunner.connection.options.type) {
			case DatabaseTypeEnum.sqlite:
			case DatabaseTypeEnum.betterSqlite3:
			case DatabaseTypeEnum.postgres:
			case DatabaseTypeEnum.mysql:
				try {
					await RolePermissionUtils.migrateRolePermissions(queryRunner);
				} catch (error) {
					console.log(chalk.red(`Error while migrating missing role permisions: ${error}`));
				}
				break;
			default:
				throw Error(`Unsupported database: ${queryRunner.connection.options.type}`);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// This migration cannot be reverted - permission changes are data-dependent
	}
}
