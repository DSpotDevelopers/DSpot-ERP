import * as loginPage from '../../Base/pages/Login.po';
import { LoginPageData } from '../../Base/pagedata/LoginPageData';
import * as invoicesPage from '../../Base/pages/Invoices.po';
import { InvoicesPageData } from '../../Base/pagedata/InvoicesPageData';
import * as dashboardPage from '../../Base/pages/Dashboard.po';
import { CustomCommands } from '../../commands';
import { faker } from '@faker-js/faker';
import * as logoutPage from '../../Base/pages/Logout.po';

import { Given, Then, When, And } from 'cypress-cucumber-preprocessor/steps';

const pageLoadTimeout = Cypress.config('pageLoadTimeout');

const sendEmail = faker.internet.exampleEmail();

// Login with email
Given('Login with default credentials', () => {
	CustomCommands.login(loginPage, LoginPageData, dashboardPage);
});

// Add new invoice
Then('User can visit Invoices page', () => {
	CustomCommands.logout(dashboardPage, logoutPage, loginPage);
	CustomCommands.clearCookies();
	CustomCommands.login(loginPage, LoginPageData, dashboardPage);
	dashboardPage.verifyAccountingDashboardIfVisible();
	cy.intercept('GET', '/api/invoices/pagination*').as('waitInvoices');
	cy.visit('/#/pages/accounting/invoices', { timeout: pageLoadTimeout });
	cy.wait('@waitInvoices');
});

And('User can see add Invoice button', () => {
	invoicesPage.addButtonVisible();
});

When('User click on add Invoice button', () => {
	invoicesPage.clickAddButton();
});

And('User can see discount input field', () => {
	invoicesPage.discountInputVisible();
});

And('User can enter value for discount', () => {
	invoicesPage.enterDiscountData(InvoicesPageData.discountValue);
});

And('User can see discount type dropdown', () => {
	invoicesPage.discountTypeDropdownVisible();
});

When('User click on discount type dropdown', () => {
	invoicesPage.clickDiscountDropdown();
});

Then('User can select discount type from dropdown options', () => {
	invoicesPage.selectDiscountTypeFromDropdown(InvoicesPageData.discountType);
});

And('User can see tax input field', () => {
	invoicesPage.taxInputVisible();
});

And('User can enter value for tax', () => {
	invoicesPage.enterTaxData(InvoicesPageData.taxValue);
});

And('User can see tax type dropdown', () => {
	invoicesPage.taxTypeDropdownVisible();
});

When('User click on tax type dropdown', () => {
	invoicesPage.clickTaxTypeDropdown();
});

Then('User can select tax type from dropdown options', () => {
	invoicesPage.selectTaxTypeFromDropdown(InvoicesPageData.taxType);
});

And('User can see invoice type dropdown', () => {
	invoicesPage.invoiceTypeDropdownVisible();
});

When('User click on invoice type dropdown', () => {
	invoicesPage.clickInvoiceTypeDropdown();
});

Then('User can select invoice type from dropdown options', () => {
	invoicesPage.selectInvoiceTypeFromDropdown(InvoicesPageData.invoiceType);
});

And('User can see employee dropdown', () => {
	invoicesPage.employeeDropdownVisible();
});

And('User can see generate items button', () => {
	invoicesPage.generateItemsButtonVisible();
});

When('User click on generate items button', () => {
	invoicesPage.clickGenerateItemsButton();
});

Then('Save as draft button will become active', () => {
	invoicesPage.saveAsDraftButtonVisible();
});

When('User click on Save as draft button', () => {
	invoicesPage.clickSaveAsDraftButton(InvoicesPageData.saveAsDraftButton);
});

Then('Notification message will appear', () => {
	invoicesPage.waitMessageToHide();
});

And('User can verify invoice was created', () => {
	invoicesPage.verifyDraftBadgeClass();
});

// Search invoice
And('User can see tab button', () => {
	invoicesPage.verifyTabButtonVisible();
});

When('User click on second tab button', () => {
	invoicesPage.clickTabButton(1);
});

Then('User can see invoice number input field', () => {
	invoicesPage.verifyEstimateNumberInputVisible();
});

And('User can enter invoice number', () => {
	invoicesPage.enterEstimateNumberInputData(InvoicesPageData.invoiceNumber);
});

And('User can see currency dropdown', () => {
	invoicesPage.verifyCurrencyDropdownVisible();
});

And('User can see invoice date input field', () => {
	invoicesPage.verifyEstimateDateInput();
});

And('User can see invoice due date input field', () => {
	invoicesPage.verifyEstimateDueDateInput();
});

And('User can see total value input field', () => {
	invoicesPage.verifyTotalValueInputVisible();
});

And('User can see status input field', () => {
	invoicesPage.verifyStatusInputVisible();
});

And('User can see search button', () => {
	invoicesPage.searchButtonVisible();
});

When('User click on search button', () => {
	invoicesPage.clickSearchButton();
});

Then('User can see reset button', () => {
	invoicesPage.resetButtonVisible();
});

When('User click on reset button', () => {
	invoicesPage.clickResetButton();
});

Then('User can click search button', () => {
	invoicesPage.clickSearchButton();
});

And('User can verify badge', () => {
	invoicesPage.verifyDraftBadgeClass();
});

And('User can edit invoice number', () => {
	invoicesPage.enterEstimateNumberInputData(InvoicesPageData.secondInvoiceNumber);
});

And('User can click search button again', () => {
	invoicesPage.clickSearchButton();
});

And('User can click on reset button', () => {
	invoicesPage.clickResetButton();
});

And('User can verify badge', () => {
	invoicesPage.verifyDraftBadgeClass();
});

And('User can click on next tab button', () => {
	invoicesPage.clickTabButton(2);
});

And('User can verify badge', () => {
	invoicesPage.verifyDraftBadgeClass();
});

// Edit invoice
When('User click on first tab button', () => {
	invoicesPage.clickTabButton(0);
});

Then('User can select invoices first table row', () => {
	invoicesPage.selectTableRow(0);
});

And('Edit button will become active', () => {
	invoicesPage.editButtonVisible();
});

When('User click on edit button', () => {
	invoicesPage.clickEditButton(0);
});

Then('User can see discount input field', () => {
	invoicesPage.discountInputVisible();
});

And('User can enter value for discount', () => {
	invoicesPage.enterDiscountData(InvoicesPageData.editDiscountValue);
});

And('User can see discount type dropdown', () => {
	invoicesPage.discountTypeDropdownVisible();
});

When('User click on discount type dropdown', () => {
	invoicesPage.clickDiscountDropdown();
});

Then('User can select discount type from dropdown options', () => {
	invoicesPage.selectDiscountTypeFromDropdown(InvoicesPageData.discountType);
});

And('User can see tax input field', () => {
	invoicesPage.taxInputVisible();
});

And('User can enter value for tax', () => {
	invoicesPage.enterTaxData(InvoicesPageData.taxValue);
});

And('User can see tax type dropdown', () => {
	invoicesPage.taxTypeDropdownVisible();
});

When('User click on tax type dropdown', () => {
	invoicesPage.clickTaxTypeDropdown();
});

Then('User can select tax type from dropdown options', () => {
	invoicesPage.selectTaxTypeFromDropdown(InvoicesPageData.taxType);
});

Then('Save as draft button will become active', () => {
	invoicesPage.saveAsDraftButtonVisible();
});

When('User click on Save as draft button', () => {
	invoicesPage.clickSaveAsDraftButton(InvoicesPageData.saveAsDraftButton);
});

Then('Notification message will appear', () => {
	invoicesPage.waitMessageToHide();
});

// View invoice
When('User select invoices first table row', () => {
	invoicesPage.selectTableRow(0);
});

Then('View invoice button will become active', () => {
	invoicesPage.viewButtonVisible();
});

And('User can click on vew invoice button', () => {
	invoicesPage.clickViewButton();
});

And('User can see back button', () => {
	invoicesPage.backButtonVisible();
});

When('User click on back button', () => {
	invoicesPage.clickBackButton();
});

// Send invoice by email
Then('User can click again on invoices first table row', () => {
	invoicesPage.selectTableRow(0);
});

Then('User can scroll down to email input field', () => {
	invoicesPage.scrollEmailInviteTemplate();
});

And('User can see email input field', () => {
	invoicesPage.emailInputVisible();
});

And('User can enter value for email', () => {
	invoicesPage.enterEmailData(sendEmail);
});

Then('Notification message will appear', () => {
	invoicesPage.waitMessageToHide();
});

// Delete invoice
Then('User can click on invoices first row', () => {
	invoicesPage.selectTableRow(0);
});

When('User click on delete button', () => {
	invoicesPage.clickDeleteButton();
});

Then('User can see confirm delete button', () => {
	invoicesPage.confirmDeleteButtonVisible();
});

When('User click on confirm delete button', () => {
	invoicesPage.clickConfirmDeleteButton();
});

Then('Notification message will appear', () => {
	invoicesPage.waitMessageToHide();
});
