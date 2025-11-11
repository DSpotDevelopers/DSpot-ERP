// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor

import { NestFactory } from '@nestjs/core';
import { ApplicationPluginConfig } from '@gauzy/common';
import { registerPluginConfig } from '../../bootstrap';
import { SeedDataService } from './seed-data.service';
import { SeederModule } from './seeder.module';

/**
 * Common utility to run SeedDataService operations
 */
async function runSeedOperation(
	devConfig: Partial<ApplicationPluginConfig>,
	operation: (seeder: SeedDataService) => Promise<void>
) {
	await registerPluginConfig(devConfig);

	return NestFactory.createApplicationContext(SeederModule.forPlugins(), {
		logger: ['log', 'error', 'warn', 'debug', 'verbose']
	})
		.then(async (app) => {
			try {
				const seeder = app.get(SeedDataService);
				await operation(seeder);
			} catch (error) {
				throw error;
			} finally {
				await app.close();
			}
		})
		.catch((error) => {
			throw error;
		});
}

/**
 * WARNING: Running this file will DELETE all data in your database
 * and generate and insert new, system default minimal data into your database.
 *
 * BE CAREFUL running this file in production env. It's possible to delete all production data.
 * SeedData checks if environment is in production or not by checking src/environments/environment.ts file configs.
 * If environment.production config is set to true, then the seeding process will only generate default roles and 2 default users.
 *
 */
export async function seedDefault(devConfig: Partial<ApplicationPluginConfig>) {
	await runSeedOperation(devConfig, async (seeder) => {
		await seeder.runDefaultSeed(false);
	});
}

/**
 * Seeds organization-specific data for e2e testing within an existing database.
 * Creates E2E Testing Tenant and Organization with essential data for testing.
 * Does not reset the database, only adds organization-specific data.
 *
 */
export async function seedE2E(devConfig: Partial<ApplicationPluginConfig>) {
	await runSeedOperation(devConfig, async (seeder) => {
		await seeder.runE2ESeed(false);
	});
}

/**
 * Cleanup E2E testing data from the database.
 * Removes E2E Testing Organization, Tenant, and all related data.
 *
 */
export async function cleanupE2E(devConfig: Partial<ApplicationPluginConfig>) {
	await runSeedOperation(devConfig, async (seeder) => {
		await seeder.runE2ECleanup();
	});
}

/**
 * Reset E2E testing data - cleanup and seed in one operation.
 * This function runs cleanup and seed internally without rebuilding dependencies.
 * More efficient than running cleanup and seed separately via yarn commands.
 *
 */
export async function resetE2E(devConfig: Partial<ApplicationPluginConfig>) {
	await runSeedOperation(devConfig, async (seeder) => {
		// First cleanup any existing E2E data
		console.log('🧹 Cleaning up existing E2E data...');
		await seeder.runE2ECleanup();

		// Then seed fresh E2E data
		console.log('🌱 Seeding fresh E2E data...');
		await seeder.runE2ESeed(false);

		console.log('✅ E2E reset completed successfully');
	});
}
