import { Logger } from '@nestjs/common';
import { resetE2E } from '@gauzy/core';
import { pluginConfig } from './plugin-config';

const logger = new Logger('GZY - ResetE2E');

/**
 * E2E Reset Script
 *
 * This script resets all E2E testing data by:
 * 1. Cleaning up existing E2E data (organization, tenant, users, etc.)
 * 2. Seeding fresh E2E data
 *
 * This is more efficient than running cleanup and seed separately
 * as it doesn't require rebuilding dependencies multiple times.
 *
 * Usage: yarn reset:e2e
 */
resetE2E(pluginConfig).catch((error) => {
	logger.error(`Error resetting e2e data: ${error}`);
	process.exit(1);
});
