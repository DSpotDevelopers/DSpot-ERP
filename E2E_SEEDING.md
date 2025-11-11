# E2E Organization Seeding

## Overview

This is the first implementation of dedicated E2E testing seeding. Previously, E2E tests were running against the default organization, which caused conflicts with manual testing and introduced noise depending on the environment.

## What Changed

### Before (No Dedicated E2E Setup)
- E2E tests ran against the default organization
- Constant conflicts with manual testing setup
- Manually induced noise depending on the environment
- No isolation between E2E tests and development data

### After (First E2E Implementation)
- Dedicated E2E Testing Tenant and Organization
- Seeds only organization-specific data within existing database
- Creates E2E-specific users with different emails to avoid conflicts
- Adds essential tags and employee levels for testing
- Complete isolation from development data

## How It Works

### 1. Database Connection
- Connects to existing database (no reset)
- Uses same database as development/production

### 2. Tenant Creation
- Creates "E2E Testing Tenant" if it doesn't exist
- Reuses existing tenant if found

### 3. Organization Creation
- Creates "E2E Testing Organization" if it doesn't exist
- Reuses existing organization if found
- Sets as default organization for the tenant

### 4. Essential Data Seeding
- Creates tag types and tags for testing
- Creates employee levels for testing
- Minimal data for fast test execution

## Usage

### For CI/CD
```bash
# Seed organization data for e2e testing
yarn seed:e2e

# Start API (will skip auto-seeding due to E2E_TESTING=true)
E2E_TESTING=true yarn start:api

# Run e2e tests
yarn start:e2e
```

### For Development
```bash
# Seed organization data
yarn seed:e2e

# Start API with e2e testing
E2E_TESTING=true yarn start:api
```

## Reset Functionality

### Why Reset is Needed
Sometimes you need to completely reset the E2E testing environment to ensure a clean state. This is especially useful when:
- Tests have modified data that affects other tests
- You want to ensure a fresh start for testing
- Debugging test issues that might be caused by accumulated data

### Reset Command
The most efficient way to reset E2E data is using the combined reset command:

```bash
# Reset E2E data (cleanup + seed in one operation)
yarn reset:e2e
```

### How Reset Works
The reset command:
1. **Cleans up existing E2E data** (organization, tenant, users, all related entities)
2. **Seeds fresh E2E data** (new organization, users, essential data)
3. **Runs internally** without rebuilding dependencies multiple times

### Individual Commands
You can also run cleanup and seed separately if needed:

```bash
# Clean up existing E2E data only
yarn cleanup:e2e

# Seed fresh E2E data only
yarn seed:e2e
```

### Performance Benefits
- **Reset**: Single dependency build, single database connection
- **Separate commands**: Multiple dependency builds, multiple database connections

## Cleanup

### Why Cleanup is Complex
Removing an organization and all its related data is complex due to the many database relationships. The E2E organization has relationships with:
- 60+ organization-scoped entities (extending `TenantOrganizationBaseEntity`)
- User relationships (default organization, last organization)
- Many-to-many relationships with tags, skills, etc.
- Cascade relationships that need to be handled properly

### Cleanup Script
A comprehensive cleanup script is available to safely remove all E2E testing data:

```bash
# Remove all E2E testing data
yarn cleanup:e2e
```

The cleanup script will:
1. **Delete organization-scoped entities**: Removes all data from 60+ entities that belong to the E2E organization
2. **Delete E2E-specific users**: Removes the three E2E users with their unique emails
3. **Delete the E2E organization**: Removes the organization itself
4. **Delete the E2E tenant**: Only if no other organizations exist for that tenant

### What Gets Cleaned Up
- ✅ E2E Testing Organization
- ✅ E2E Testing Tenant (if no other organizations)
- ✅ E2E-specific users (`e2e.admin@dspot.com.pl`, `e2e.local.admin@dspot.com.pl`, `e2e.employee@dspot.com.pl`)
- ✅ All organization-scoped data (tasks, timesheets, activities, etc.)
- ✅ All related entities (tags, skills, projects, teams, etc.)

### Safety Features
- **Idempotent**: Can be run multiple times safely
- **Selective**: Only removes E2E-specific data
- **Logging**: Provides detailed logs of what was deleted
- **Error handling**: Continues even if some entities fail to delete

## Benefits

1. **No Database Conflicts**: Uses existing database, no separate files
2. **Faster Setup**: No need to reset entire database
3. **Better Isolation**: Organization-level isolation
4. **Reusable**: Can run multiple times safely
5. **CI/CD Friendly**: Simple one-command seeding
6. **Complete Cleanup**: Comprehensive cleanup script available
7. **Efficient Reset**: Combined cleanup and seed in one operation

## Data Created

- ✅ E2E Testing Tenant
- ✅ E2E Testing Organization (default)
- ✅ E2E-specific users (different emails to avoid conflicts)
- ✅ Tag Types and Tags
- ✅ Employee Levels
- ❌ No demo or random data

## E2E User Credentials

### **E2E Super Admin**
- Email: `e2e.admin@dspot.com.pl`
- Password: `admin`

### **E2E Local Admin**
- Email: `e2e.local.admin@dspot.com.pl`
- Password: `admin`

### **E2E Employee**
- Email: `e2e.employee@dspot.com.pl`
- Password: `123456`

## Environment Variables

The seeding respects these environment variables:
- `E2E_TESTING=true` - Prevents automatic API seeding
- `DB_TYPE` - Database type (better-sqlite3, postgres, mysql)
- `DB_PATH` - Database path (for SQLite)
- `DB_HOST`, `DB_PORT`, etc. - Database connection settings
