import { MigrationInterface, QueryRunner } from 'typeorm';
import * as chalk from 'chalk';
import { DatabaseTypeEnum } from '@gauzy/config';

export class AddSemanticInvoiceId1770112331675 implements MigrationInterface {
	name = 'AddSemanticInvoiceId1770112331675';

	/**
	 * Up Migration
	 *
	 * @param queryRunner
	 */
	public async up(queryRunner: QueryRunner): Promise<void> {
		console.log(chalk.yellow(this.name + ' start running!'));

		switch (queryRunner.connection.options.type) {
			case DatabaseTypeEnum.sqlite:
			case DatabaseTypeEnum.betterSqlite3:
				await this.sqliteUpQueryRunner(queryRunner);
				break;
			case DatabaseTypeEnum.postgres:
				await this.postgresUpQueryRunner(queryRunner);
				break;
			case DatabaseTypeEnum.mysql:
				await this.mysqlUpQueryRunner(queryRunner);
				break;
			default:
				throw Error(`Unsupported database: ${queryRunner.connection.options.type}`);
		}
	}

	/**
	 * Down Migration
	 *
	 * @param queryRunner
	 */
	public async down(queryRunner: QueryRunner): Promise<void> {
		switch (queryRunner.connection.options.type) {
			case DatabaseTypeEnum.sqlite:
			case DatabaseTypeEnum.betterSqlite3:
				await this.sqliteDownQueryRunner(queryRunner);
				break;
			case DatabaseTypeEnum.postgres:
				await this.postgresDownQueryRunner(queryRunner);
				break;
			case DatabaseTypeEnum.mysql:
				await this.mysqlDownQueryRunner(queryRunner);
				break;
			default:
				throw Error(`Unsupported database: ${queryRunner.connection.options.type}`);
		}
	}

	/**
	 * PostgresDB Up Migration
	 *
	 * Adds user columns (initials, userNumber, lastInvoiceNumber) and invoice.semanticId.
	 * Existing users get userNumber/initials and lastInvoiceNumber from current invoice count.
	 * Existing invoices keep semanticId null; only new invoices will receive a semanticId.
	 *
	 * @param queryRunner
	 */
	public async postgresUpQueryRunner(queryRunner: QueryRunner): Promise<any> {
		// Add new columns to user table
		await queryRunner.query(`ALTER TABLE "user" ADD "initials" character varying`);
		await queryRunner.query(`ALTER TABLE "user" ADD "userNumber" integer`);
		await queryRunner.query(`ALTER TABLE "user" ADD "lastInvoiceNumber" integer DEFAULT 0`);
		await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_user_userNumber" UNIQUE ("userNumber")`);

		// Add semanticId column to invoice table (nullable; existing rows stay null)
		await queryRunner.query(`ALTER TABLE "invoice" ADD "semanticId" character varying`);
		await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "UQ_invoice_semanticId" UNIQUE ("semanticId")`);
		await queryRunner.query(`CREATE INDEX "IDX_invoice_semanticId" ON "invoice" ("semanticId")`);

		// Populate existing users (userNumber, initials) and set lastInvoiceNumber from current invoice count
		await this.populateExistingUsersAndLastInvoiceNumberPostgres(queryRunner);
	}

	/**
	 * PostgresDB Down Migration
	 *
	 * @param queryRunner
	 */
	public async postgresDownQueryRunner(queryRunner: QueryRunner): Promise<any> {
		// Remove invoice columns
		await queryRunner.query(`DROP INDEX IF EXISTS "IDX_invoice_semanticId"`);
		await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT IF EXISTS "UQ_invoice_semanticId"`);
		await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN IF EXISTS "semanticId"`);

		// Remove user columns
		await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "UQ_user_userNumber"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "lastInvoiceNumber"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "userNumber"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "initials"`);
	}

	/**
	 * SqliteDB and BetterSQlite3DB Up Migration
	 *
	 * Adds user columns and invoice.semanticId. Existing users get userNumber/initials and
	 * lastInvoiceNumber from current invoice count. Existing invoices keep semanticId null.
	 *
	 * @param queryRunner
	 */
	public async sqliteUpQueryRunner(queryRunner: QueryRunner): Promise<any> {
		// Add new columns to user table
		await queryRunner.query(`ALTER TABLE "user" ADD "initials" varchar`);
		await queryRunner.query(`ALTER TABLE "user" ADD "userNumber" integer`);
		await queryRunner.query(`ALTER TABLE "user" ADD "lastInvoiceNumber" integer DEFAULT 0`);

		// Add semanticId column to invoice table (nullable; existing rows stay null)
		await queryRunner.query(`ALTER TABLE "invoice" ADD "semanticId" varchar`);

		// Populate existing users (userNumber, initials) and set lastInvoiceNumber from current invoice count
		await this.populateExistingUsersAndLastInvoiceNumberSqlite(queryRunner);
	}

	/**
	 * SqliteDB and BetterSQlite3DB Down Migration
	 *
	 * @param queryRunner
	 */
	public async sqliteDownQueryRunner(queryRunner: QueryRunner): Promise<any> {
		// SQLite doesn't support DROP COLUMN directly, but we'll handle the rollback logic
		// In practice, you may need to recreate the table without these columns
		console.log(chalk.yellow('SQLite down migration - columns will remain but data may be cleared'));
	}

	/**
	 * MySQL Up Migration
	 *
	 * Adds user columns and invoice.semanticId. Existing users get userNumber/initials and
	 * lastInvoiceNumber from current invoice count. Existing invoices keep semanticId null.
	 *
	 * @param queryRunner
	 */
	public async mysqlUpQueryRunner(queryRunner: QueryRunner): Promise<any> {
		// Add new columns to user table
		await queryRunner.query(`ALTER TABLE \`user\` ADD \`initials\` varchar(10) NULL`);
		await queryRunner.query(`ALTER TABLE \`user\` ADD \`userNumber\` int NULL`);
		await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastInvoiceNumber\` int DEFAULT 0`);
		await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`UQ_user_userNumber\` UNIQUE (\`userNumber\`)`);

		// Add semanticId column to invoice table (nullable; existing rows stay null)
		await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`semanticId\` varchar(50) NULL`);
		await queryRunner.query(
			`ALTER TABLE \`invoice\` ADD CONSTRAINT \`UQ_invoice_semanticId\` UNIQUE (\`semanticId\`)`
		);
		await queryRunner.query(`CREATE INDEX \`IDX_invoice_semanticId\` ON \`invoice\` (\`semanticId\`)`);

		// Populate existing users (userNumber, initials) and set lastInvoiceNumber from current invoice count
		await this.populateExistingUsersAndLastInvoiceNumberMysql(queryRunner);
	}

	/**
	 * MySQL Down Migration
	 *
	 * @param queryRunner
	 */
	public async mysqlDownQueryRunner(queryRunner: QueryRunner): Promise<any> {
		// Remove invoice columns
		await queryRunner.query(`DROP INDEX \`IDX_invoice_semanticId\` ON \`invoice\``);
		await queryRunner.query(`ALTER TABLE \`invoice\` DROP INDEX \`UQ_invoice_semanticId\``);
		await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`semanticId\``);

		// Remove user columns
		await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`UQ_user_userNumber\``);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastInvoiceNumber\``);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userNumber\``);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`initials\``);
	}

	/**
	 * Populate existing users with userNumber and initials, and set lastInvoiceNumber
	 * from current invoice count per user (PostgreSQL).
	 * Existing invoices are not modified; semanticId remains null for them.
	 */
	private async populateExistingUsersAndLastInvoiceNumberPostgres(queryRunner: QueryRunner): Promise<void> {
		// 1. Assign sequential userNumber and initials to existing users (ordered by createdAt)
		await queryRunner.query(`
			WITH numbered_users AS (
				SELECT id,
					   UPPER(COALESCE(SUBSTRING("firstName" FROM 1 FOR 1), 'X')) ||
					   UPPER(COALESCE(SUBSTRING("lastName" FROM 1 FOR 1), 'X')) AS computed_initials,
					   ROW_NUMBER() OVER (ORDER BY "createdAt" ASC) AS row_num
				FROM "user"
				WHERE "userNumber" IS NULL
			)
			UPDATE "user" u
			SET "initials" = nu.computed_initials,
				"userNumber" = nu.row_num
			FROM numbered_users nu
			WHERE u.id = nu.id
		`);

		// 2. Set lastInvoiceNumber for each user to their current invoice count (so next invoice gets correct number)
		await queryRunner.query(`
			WITH invoice_counts AS (
				SELECT "fromUserId", COUNT(*) AS invoice_count
				FROM "invoice"
				WHERE "fromUserId" IS NOT NULL
				GROUP BY "fromUserId"
			)
			UPDATE "user" u
			SET "lastInvoiceNumber" = ic.invoice_count
			FROM invoice_counts ic
			WHERE u.id = ic."fromUserId"
		`);
	}

	/**
	 * Populate existing users with userNumber and initials, and set lastInvoiceNumber
	 * from current invoice count per user (SQLite / BetterSqlite3).
	 * Existing invoices are not modified; semanticId remains null for them.
	 */
	private async populateExistingUsersAndLastInvoiceNumberSqlite(queryRunner: QueryRunner): Promise<void> {
		// 1. Get all users ordered by createdAt and assign userNumber and initials
		const users = await queryRunner.query(`
			SELECT id, "firstName", "lastName"
			FROM "user"
			WHERE "userNumber" IS NULL
			ORDER BY "createdAt" ASC
		`);

		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			const firstInitial = (user.firstName?.charAt(0) || 'X').toUpperCase();
			const lastInitial = (user.lastName?.charAt(0) || 'X').toUpperCase();
			const initials = `${firstInitial}${lastInitial}`;
			const userNumber = i + 1;

			await queryRunner.query(`UPDATE "user" SET "initials" = ?, "userNumber" = ? WHERE id = ?`, [
				initials,
				userNumber,
				user.id
			]);
		}

		// 2. Set lastInvoiceNumber for each user to their current invoice count
		const invoiceCounts = await queryRunner.query(`
			SELECT "fromUserId", COUNT(*) AS invoice_count
			FROM "invoice"
			WHERE "fromUserId" IS NOT NULL
			GROUP BY "fromUserId"
		`);

		for (const row of invoiceCounts) {
			await queryRunner.query(`UPDATE "user" SET "lastInvoiceNumber" = ? WHERE id = ?`, [
				row.invoice_count,
				row.fromUserId
			]);
		}
	}

	/**
	 * Populate existing users with userNumber and initials, and set lastInvoiceNumber
	 * from current invoice count per user (MySQL).
	 * Existing invoices are not modified; semanticId remains null for them.
	 */
	private async populateExistingUsersAndLastInvoiceNumberMysql(queryRunner: QueryRunner): Promise<void> {
		// 1. Assign sequential userNumber and initials to existing users (ordered by createdAt)
		await queryRunner.query(`SET @row_number = 0`);

		await queryRunner.query(`
			UPDATE \`user\`
			SET \`initials\` = UPPER(CONCAT(
					COALESCE(SUBSTRING(\`firstName\`, 1, 1), 'X'),
					COALESCE(SUBSTRING(\`lastName\`, 1, 1), 'X')
				)),
				\`userNumber\` = (@row_number := @row_number + 1)
			WHERE \`userNumber\` IS NULL
			ORDER BY \`createdAt\` ASC
		`);

		// 2. Set lastInvoiceNumber for each user to their current invoice count
		await queryRunner.query(`
			UPDATE \`user\` u
			JOIN (
				SELECT \`fromUserId\`, COUNT(*) AS invoice_count
				FROM \`invoice\`
				WHERE \`fromUserId\` IS NOT NULL
				GROUP BY \`fromUserId\`
			) ic ON u.id = ic.\`fromUserId\`
			SET u.\`lastInvoiceNumber\` = ic.invoice_count
		`);
	}
}
