import { Logger } from '@nestjs/common';
import { seedE2E } from '@gauzy/core';
import { pluginConfig } from './plugin-config';

const logger = new Logger('GZY - SeedE2E');

/**
 * E2E Organization Seeding Script
 *
 * This script seeds only organization-specific data within an existing database
 * for e2e testing purposes. It creates:
 * - E2E Testing Tenant (if not exists)
 * - E2E Testing Organization (if not exists)
 * - Essential tags and employee levels for testing
 *
 * Usage: yarn seed:e2e
 */
seedE2E(pluginConfig).catch((error) => {
	logger.error(`Error seeding e2e organization data: ${error}`);
	process.exit(1);
});
