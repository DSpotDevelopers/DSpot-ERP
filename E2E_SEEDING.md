# E2E Organization Seeding

## Overview

The E2E seeding approach has been modified to seed only organization-specific data within an existing database, rather than creating a separate database. This provides better isolation and efficiency for e2e testing.

## What Changed

### Before
- Created a separate database file (`gauzy-e2e.sqlite3`)
- Reset entire database and seeded all data
- Required separate database setup

### After
- Uses existing database
- Seeds only organization-specific data
- Creates E2E Testing Tenant and Organization
- Adds essential tags and employee levels for testing

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

## Benefits

1. **No Database Conflicts**: Uses existing database, no separate files
2. **Faster Setup**: No need to reset entire database
3. **Better Isolation**: Organization-level isolation
4. **Reusable**: Can run multiple times safely
5. **CI/CD Friendly**: Simple one-command seeding

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
