import {
	enterInput,
	verifyElementIsVisible,
	clickButton,
	clearField,
	clickButtonByIndex,
	clickElementByText,
	waitElementToHide,
	clickButtonByText,
	verifyValue,
	scrollDown,
	verifyElementIsNotVisible
} from '../utils/util';
import { InvoicesPage } from '../pageobjects/InvoicesPageObject';

export const addButtonVisible = () => {
	cy.get(InvoicesPage.actionsBarCss).findByRole('button', { name: InvoicesPage.addButtonName }).should('be.visible');
};

export const clickAddButton = () => {
	cy.get(InvoicesPage.actionsBarCss)
		.findByRole('button', { name: InvoicesPage.addButtonName })
		.click({ force: true });
};

export const clickCardBody = () => {
	clickButton(InvoicesPage.cardBodyCss);
};

export const waitMessageToHide = () => {
	waitElementToHide(InvoicesPage.toastrMessageCss);
};

export const discountInputVisible = () => {
	verifyElementIsVisible(InvoicesPage.discountInputCss);
};

export const enterDiscountData = (data) => {
	clearField(InvoicesPage.discountInputCss);
	enterInput(InvoicesPage.discountInputCss, data);
};

export const discountTypeDropdownVisible = () => {
	verifyElementIsVisible(InvoicesPage.discountTypeDropdownCss);
};

export const clickDiscountDropdown = () => {
	clickButton(InvoicesPage.discountTypeDropdownCss);
};

export const selectDiscountTypeFromDropdown = (text) => {
	clickElementByText(InvoicesPage.dropdownOptionCss, text);
};

export const taxInputVisible = () => {
	verifyElementIsVisible(InvoicesPage.taxInputCss);
};

export const enterTaxData = (data) => {
	clearField(InvoicesPage.taxInputCss);
	enterInput(InvoicesPage.taxInputCss, data);
};

export const taxTypeDropdownVisible = () => {
	verifyElementIsVisible(InvoicesPage.taxTypeDropdownCss);
};

export const clickTaxTypeDropdown = () => {
	clickButton(InvoicesPage.taxTypeDropdownCss);
};

export const selectTaxTypeFromDropdown = (text) => {
	clickElementByText(InvoicesPage.dropdownOptionCss, text);
};

export const invoiceTypeDropdownVisible = () => {
	verifyElementIsVisible(InvoicesPage.invoiceTypeDropdownCss);
};

export const clickInvoiceTypeDropdown = () => {
	clickButton(InvoicesPage.invoiceTypeDropdownCss);
};

export const selectInvoiceTypeFromDropdown = (text) => {
	clickElementByText(InvoicesPage.dropdownOptionCss, text);
};

export const employeeDropdownVisible = () => {
	verifyElementIsVisible(InvoicesPage.selectEmployeeCss);
};

export const generateItemsButtonVisible = () => {
	verifyElementIsVisible(InvoicesPage.generateItemsButtonCss);
};

export const clickGenerateItemsButton = () => {
	clickButton(InvoicesPage.generateItemsButtonCss);
};

export const saveAsDraftButtonVisible = () => {
	verifyElementIsVisible(InvoicesPage.saveAsDraftButtonCss);
};

export const clickSaveAsDraftButton = (text: string) => {
	clickButtonByText(text);
};

export const tableRowVisible = () => {
	verifyElementIsVisible(InvoicesPage.tableRowCss);
};

export const selectTableRow = (index) => {
	clickButtonByIndex(InvoicesPage.tableRowCss, index);
};

export const backButtonVisible = () => {
	verifyElementIsVisible(InvoicesPage.backButtonCss);
};

export const clickBackButton = () => {
	clickButton(InvoicesPage.backButtonCss);
};

export const emailInputVisible = () => {
	verifyElementIsVisible(InvoicesPage.emailInputCss);
};

export const enterEmailData = (data) => {
	enterInput(InvoicesPage.emailInputCss, data);
};

export const editButtonVisible = () => {
	verifyElementIsVisible(InvoicesPage.editButtonCss);
};

export const clickEditButton = (index) => {
	clickButtonByIndex(InvoicesPage.editButtonCss, index);
};

export const viewButtonVisible = () => {
	cy.get(InvoicesPage.viewButtonCss).contains('View').should('be.visible');
};

export const clickViewButton = () => {
	cy.get(InvoicesPage.viewButtonCss).contains('View').click({ force: true });
};

export const clickDeleteButton = () => {
	cy.get(InvoicesPage.deleteButtonCss).click({ force: true });
};

export const confirmDeleteButtonVisible = () => {
	verifyElementIsVisible(InvoicesPage.confirmDeleteButtonCss);
};

export const clickConfirmDeleteButton = () => {
	clickButton(InvoicesPage.confirmDeleteButtonCss);
};

export const setStatusButtonVisible = () => {
	verifyElementIsVisible(InvoicesPage.setStatusButtonCss);
};

export const clickSetStatusButton = (text) => {
	clickElementByText(InvoicesPage.setStatusButtonCss, text);
};

export const setStatusFromDropdown = (text) => {
	clickElementByText(InvoicesPage.dropdownOptionCss, text);
};

export const openStatusDropdown = () => {
	cy.get(InvoicesPage.openStatusDropdownCss).should('be.visible').click();
};

export const selectStatus = (status: string) => {
	cy.contains(InvoicesPage.selectStatusOptionCss, status).should('be.visible').click();
};

export const verifyEstimateExists = (val) => {
	verifyValue(InvoicesPage.verifyInvoiceCss, val);
};

export const verifyDraftBadgeClass = () => {
	verifyElementIsVisible(InvoicesPage.draftBadgeCss);
};

export const verifyElementIsDeleted = () => {
	cy.get('table tbody tr').then((rows) => {
		if (rows.length === 1 && rows.text().includes('You have not created any invoices.')) {
			cy.contains('td', 'You have not created any invoices.').should('be.visible');
		} else {
			cy.get('table tbody tr').should('have.length.lessThan', rows.length + 1);
		}
	});
};

export const scrollEmailInviteTemplate = () => {
	scrollDown(InvoicesPage.emailCardCss);
};

export const verifyTabButtonVisible = () => {
	cy.get(InvoicesPage.tabButtonCss).should('be.visible');
};

export const clickTabButton = (index: number) => {
	cy.get(InvoicesPage.tabButtonCss).eq(index).click({ force: true });
};

export const verifyEstimateNumberInputVisible = () => {
	verifyElementIsVisible(InvoicesPage.inputInvoiceNumberCss);
};

export const enterEstimateNumberInputData = (data) => {
	clearField(InvoicesPage.inputInvoiceNumberCss);
	enterInput(InvoicesPage.inputInvoiceNumberCss, data);
};

export const verifyEstimateDateInput = () => {
	verifyElementIsVisible(InvoicesPage.estimateDateCss);
};

export const verifyEstimateDueDateInput = () => {
	verifyElementIsVisible(InvoicesPage.dueDateInputCss);
};

export const verifyTotalValueInputVisible = () => {
	verifyElementIsVisible(InvoicesPage.totalValueInputCss);
};

export const verifyCurrencyDropdownVisible = () => {
	verifyElementIsVisible(InvoicesPage.currencySelectCss);
};

export const verifyStatusInputVisible = () => {
	verifyElementIsVisible(InvoicesPage.inputStatusCss);
};

export const searchButtonVisible = () => {
	verifyElementIsVisible(InvoicesPage.searchButtonCss);
};

export const clickSearchButton = () => {
	clickButton(InvoicesPage.searchButtonCss);
};

export const verifyDraftBadgeNotVisible = () => {
	verifyElementIsNotVisible(InvoicesPage.draftBadgeCss);
};

export const resetButtonVisible = () => {
	verifyElementIsVisible(InvoicesPage.resetButtonCss);
};

export const clickResetButton = () => {
	clickButton(InvoicesPage.resetButtonCss);
};
