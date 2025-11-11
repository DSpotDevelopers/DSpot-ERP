# E2E Testing Credentials

This document outlines the credentials used for E2E testing in the Cypress project.

## Updated Credentials

The E2E testing credentials have been updated to avoid conflicts with the default development users.

### **E2E Super Admin**
- **Email**: `e2e.admin@dspot.com.pl`
- **Password**: `admin`
- **Role**: Super Admin
- **Used in**: Main login tests, admin functionality tests

### **E2E Local Admin**
- **Email**: `e2e.local.admin@dspot.com.pl`
- **Password**: `admin`
- **Role**: Local Admin
- **Used in**: Profile editing tests, admin management tests

### **E2E Employee**
- **Email**: `e2e.employee@dspot.com.pl`
- **Password**: `123456`
- **Role**: Employee
- **Used in**: Employee functionality tests, time tracking tests

## Files Updated

### `LoginPageData.ts`
```typescript
export const LoginPageData = {
    TitleText: 'DSpot ERP',
    email: 'e2e.admin@dspot.com.pl',        // Updated
    password: 'admin',
    empEmail: 'e2e.employee@dspot.com.pl',  // Updated
    empPassword: '123456'
};
```

### `EditProfilePageData.ts`
```typescript
export const EditProfilePageData = {
    preferredLanguage: 'English',
    email: 'e2e.local.admin@dspot.com.pl',  // Updated
    password: 'admin',
    firstName: 'E2E',                        // Updated
    lastName: 'Local Admin'                   // Updated
};
```

## Benefits

1. **No Conflicts**: E2E users won't interfere with development users
2. **Isolated Testing**: Each test environment has its own users
3. **Predictable**: Same credentials every time tests run
4. **Multiple Roles**: Different user types for different test scenarios

## Usage in Tests

```typescript
// Login as E2E Super Admin
CustomCommands.login(loginPage, LoginPageData, dashboardPage);

// Login as E2E Employee
CustomCommands.loginAsEmployee(loginPage, dashboardPage, LoginPageData.empEmail, LoginPageData.empPassword);
```

## Database Seeding

These credentials are created by the E2E seeding process:
```bash
yarn seed:e2e
```

The seeding creates users with these exact email addresses in the "E2E Testing Organization".
