import { Logger } from '@nestjs/common';
import { cleanupE2E } from '@gauzy/core';
import { pluginConfig } from './plugin-config';

const logger = new Logger('GZY - CleanupE2E');

/**
 * E2E Cleanup Script
 *
 * This script removes all E2E testing data from the database:
 * - E2E Testing Organization and all its related data
 * - E2E Testing Tenant (if no other organizations exist)
 * - E2E-specific users
 * - All organization-scoped data for E2E organization
 *
 * Usage: yarn cleanup:e2e
 */
cleanupE2E(pluginConfig).catch((error) => {
	logger.error(`Error cleaning up e2e data: ${error}`);
	process.exit(1);
});
