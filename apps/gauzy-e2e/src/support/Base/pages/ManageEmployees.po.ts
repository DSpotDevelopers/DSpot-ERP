import dayjs from 'dayjs';
import {
	enterInput,
	verifyElementIsVisible,
	clickButton,
	clickElementByText,
	enterInputConditionally,
	clearField,
	clickKeyboardBtnByKeycode,
	clickButtonByIndex,
	waitElementToHide,
	verifyText,
	verifyTextNotExisting,
	clickButtonWithForce,
	clickLastButton
} from '../utils/util';
import { ManageEmployeesPage } from '../pageobjects/ManageEmployeesPageObject';

export const visit = (options = {}) => {
	cy.intercept('api/**/employee/**').as('employees');
	cy.visit('/#/pages/employees', options);
	cy.wait('@employees');
};

// INVITE EMPLOYEE BY EMAIL
export const gridBtnExists = () => {
	verifyElementIsVisible(ManageEmployeesPage.gridButtonCss);
};

export const gridBtnClick = (index: number) => {
	clickButtonByIndex(ManageEmployeesPage.gridButtonCss, index);
};

export const inviteButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.inviteButtonCss);
};

export const clickInviteButton = () => {
	clickButton(ManageEmployeesPage.inviteButtonCss);
};

export const emailInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.emailsInputCss);
};

export const enterEmailData = (data: string) => {
	enterInputConditionally(ManageEmployeesPage.emailsInputCss, data);
};

export const dateInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.dateInputCss);
};

export const enterDateData = () => {
	clearField(ManageEmployeesPage.dateInputCss);
	const date = dayjs().format('MMM D, YYYY');
	enterInput(ManageEmployeesPage.dateInputCss, date);
};

export const clickKeyboardButtonByKeyCode = (keycode: number) => {
	clickKeyboardBtnByKeycode(keycode);
};

export const selectProjectDropdownVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.selectProjectDropdownCss);
};

export const clickProjectDropdown = () => {
	clickButton(ManageEmployeesPage.selectProjectDropdownCss);
};

export const selectProjectFromDropdown = (text: string) => {
	clickElementByText(ManageEmployeesPage.selectProjectDropdownOptionCss, text);
};

export const sendInviteButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.sendInviteButtonCss);
};

export const clickSendInviteButton = () => {
	clickButton(ManageEmployeesPage.sendInviteButtonCss);
};

// ADD NEW EMPLOYEE
export const addEmployeeButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.addEmployeeButtonCss);
};

export const clickAddEmployeeButton = () => {
	clickButtonWithForce(ManageEmployeesPage.addEmployeeButtonCss);
};

export const firstNameInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.firstNameInputCss);
};

export const enterFirstNameData = (data) => {
	enterInput(ManageEmployeesPage.firstNameInputCss, data);
};

export const lastNameInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.lastNameInputCss);
};

export const enterLastNameData = (data) => {
	enterInput(ManageEmployeesPage.lastNameInputCss, data);
};

export const usernameInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.usernameInputCss);
};

export const enterUsernameData = (data: string) => {
	enterInput(ManageEmployeesPage.usernameInputCss, data);
};

export const employeeEmailInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.emailInputCss);
};

export const enterEmployeeEmailData = (data: string) => {
	enterInput(ManageEmployeesPage.emailInputCss, data);
};

export const passwordInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.passwordInputCss);
};

export const enterPasswordInputData = (data: string) => {
	enterInput(ManageEmployeesPage.passwordInputCss, data);
};

export const tagsDropdownVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.addTagsDropdownCss);
};

export const clickTagsDropdown = () => {
	clickButton(ManageEmployeesPage.addTagsDropdownCss);
};

export const selectTagFromDropdown = (index: number) => {
	clickButtonByIndex(ManageEmployeesPage.tagsDropdownOption, index);
};

export const selectTagFromDropdownByText = (text: string) => {
	clickElementByText(ManageEmployeesPage.tagsDropdownOption, text);
};

export const clickCardBody = () => {
	clickButton(ManageEmployeesPage.cardBodyCss);
};

export const imageInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.imgInputCss);
};

export const enterImageDataUrl = (url: string) => {
	enterInput(ManageEmployeesPage.imgInputCss, url);
};

export const nextButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.nextButtonCss);
};

export const clickNextButton = () => {
	clickButton(ManageEmployeesPage.nextButtonCss);
};

export const nextStepButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.nextStepButtonCss);
};

export const clickNextStepButton = () => {
	clickButton(ManageEmployeesPage.nextStepButtonCss);
};

export const lastStepButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.lastStepButtonCss);
};

export const clickLastStepButton = () => {
	clickButton(ManageEmployeesPage.lastStepButtonCss);
};

// EDIT EMPLOYEE

export const tableRowVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.selectTableRowCss);
};

export const selectTableRow = (index) => {
	clickButtonByIndex(ManageEmployeesPage.selectTableRowCss, index);
};

export const selectLastTableRow = () => {
	clickLastButton(ManageEmployeesPage.selectTableRowCss);
};

export const selectTableRowsWithProject = (status, index = 0) => {
	cy.get(ManageEmployeesPage.selectTableRowCss).contains(status).eq(index).click();
};

export const editButtonVisible = () => {
	cy.get(ManageEmployeesPage.actionsBarCss).findByRole('button', { name: ManageEmployeesPage.editButtonName });
};

export const clickEditButton = () => {
	cy.get(ManageEmployeesPage.actionsBarCss)
		.findByRole('button', { name: ManageEmployeesPage.editButtonName })
		.click();
};

export const usernameEditInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.usernameEditSecondInputCss);
};

export const enterUsernameEditInputData = (data: string) => {
	clearField(ManageEmployeesPage.usernameEditSecondInputCss);
	enterInput(ManageEmployeesPage.usernameEditSecondInputCss, data);
};

export const emailEditInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.emailEditSecondInputCss);
};

export const enterEmailEditInputData = (data: string) => {
	clearField(ManageEmployeesPage.emailEditSecondInputCss);
	enterInput(ManageEmployeesPage.emailEditSecondInputCss, data);
};

export const firstNameEditInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.firstNameSecondEditInputCss);
};

export const enterFirstNameEditInputData = (data: string) => {
	clearField(ManageEmployeesPage.firstNameSecondEditInputCss);
	enterInput(ManageEmployeesPage.firstNameSecondEditInputCss, data);
};

export const lastNameEditInputVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.lastNameSecondEditInputCss);
};

export const enterLastNameEditInputData = (data: string) => {
	clearField(ManageEmployeesPage.lastNameSecondEditInputCss);
	enterInput(ManageEmployeesPage.lastNameSecondEditInputCss, data);
};

export const preferredLanguageDropdownVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.preferredLanguageDropdownCss);
};

export const clickPreferredLanguageDropdown = () => {
	clickButton(ManageEmployeesPage.preferredLanguageDropdownCss);
};

export const selectLanguageFromDropdown = (text: string) => {
	clickElementByText(ManageEmployeesPage.preferredLanguageOptionCss, text);
};

export const saveEditButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.saveEditButtonCss);
};

export const clickSaveEditButton = () => {
	clickButton(ManageEmployeesPage.saveEditButtonCss);
};

export const backButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.backButtonCss);
};

export const clickBackButton = () => {
	clickButton(ManageEmployeesPage.backButtonCss);
};

// END WORK

export const endWorkButtonVisible = () => {
	cy.get(ManageEmployeesPage.actionsBarCss)
		.findByRole('button', { name: ManageEmployeesPage.endWorkButtonName })
		.should('be.visible');
};

export const clickEndWorkButton = () => {
	cy.get(ManageEmployeesPage.actionsBarCss)
		.findByRole('button', { name: ManageEmployeesPage.endWorkButtonName })
		.click();
};

export const confirmEndWorkButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.confirmEndWorkButtonCss);
};

export const clickConfirmEndWorkButton = () => {
	clickButton(ManageEmployeesPage.confirmEndWorkButtonCss);
};

// DELETE EMPLOYEE

export const deleteButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.deleteEmployeeButtonCss);
};

export const clickDeleteButton = () => {
	clickButton(ManageEmployeesPage.deleteEmployeeButtonCss);
};

export const confirmDeleteButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.confirmDeleteButtonCss);
};

export const clickConfirmDeleteButton = () => {
	const tag = Date.now().toString().slice(-5);
	cy.intercept('api/**/employee/**').as(`employeesDeleted-${tag}`);
	clickButton(ManageEmployeesPage.confirmDeleteButtonCss);
	cy.wait(`@employeesDeleted-${tag}`);
};

// COPY INVITE LINK

export const manageInvitesButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.manageInvitesButtonCss);
};

export const clickManageInviteButton = () => {
	cy.document().then((doc) => {
		const button = doc.querySelector(ManageEmployeesPage.manageInvitesButtonCss);
		if (button) {
			cy.wrap(button).click();
		}
	});
};

export const copyLinkButtonVisible = () => {
	cy.get(ManageEmployeesPage.actionsBarCss)
		.findByRole('button', { name: ManageEmployeesPage.copyLinkButtonName })
		.should('be.visible');
};

export const clickCopyLinkButton = () => {
	cy.get(ManageEmployeesPage.actionsBarCss)
		.findByRole('button', { name: ManageEmployeesPage.copyLinkButtonName })
		.click();
};

// RESEND INVITE

export const resendInviteButtonVisible = () => {
	cy.get(ManageEmployeesPage.actionsBarCss)
		.findByRole('button', { name: ManageEmployeesPage.resendInviteButtonName })
		.should('be.visible');
};

export const clickResendInviteButton = () => {
	cy.get(ManageEmployeesPage.actionsBarCss)
		.findByRole('button', { name: ManageEmployeesPage.resendInviteButtonName })
		.click();
};

export const confirmResendInviteButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.confirmResendInviteButtonCss);
};

export const clickConfirmResendInviteButton = () => {
	clickButton(ManageEmployeesPage.confirmResendInviteButtonCss);
};

// DELETE INVITE

export const deleteInviteButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.deleteInviteButtonCss);
};

export const clickDeleteInviteButton = () => {
	clickButton(ManageEmployeesPage.deleteInviteButtonCss);
};

export const confirmDeleteInviteButtonVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.confirmDeleteInviteButtonCss);
};

export const clickConfirmDeleteInviteButton = () => {
	clickButton(ManageEmployeesPage.confirmDeleteInviteButtonCss);
};

export const waitMessageToHide = () => {
	waitElementToHide(ManageEmployeesPage.toastrMessageCss);
};

export const searchEmployee = (name: string) => {
	cy.get(ManageEmployeesPage.searchInputCss).clear().type(name);
};

export const verifyEmployeeExcists = (text: string) => {
	cy.contains('td', text).should('be.visible');
};

export const verifyEmployeeIsDeleted = (employeeName: string) => {
	cy.document().then((doc) => {
		const rows = doc.querySelectorAll(ManageEmployeesPage.verifyEmployeeCss);

		if (rows.length === 0) {
			// No employees at all → OK
			cy.wrap(true).should('be.true');
			return;
		}

		// Convert NodeList to array and check each row separately
		const texts = Array.from(rows).map((row) => row.textContent?.trim() || '');

		// Assert NONE of the row texts contains the employee name
		texts.forEach((text) => {
			expect(text).to.not.include(
				employeeName,
				`Employee "${employeeName}" should be deleted but found in: ${text}`
			);
		});
	});
};

export const verifyInviteExists = (text) => {
	verifyText(ManageEmployeesPage.verifyInviteCss, text);
};

export const verifyInviteIsDeleted = (text) => {
	verifyTextNotExisting(ManageEmployeesPage.verifyInviteCss, text);
};

export const tagsFilterDropdownVisible = () => {
	verifyElementIsVisible(ManageEmployeesPage.tagsFilterDropdownCss);
};

export const clickTagsFilterDropdown = () => {
	clickButton(ManageEmployeesPage.tagsFilterDropdownCss);
};

export const selectTagFromFilterDropdownByText = (text) => {
	clickElementByText(ManageEmployeesPage.tagsFilterDropdownOptionCss, text);
};

export const filterByTag = (text) => {
	tagsFilterDropdownVisible();
	let isTagSelected = false;
	cy.document().then((doc) => {
		const input = doc.querySelector(ManageEmployeesPage.tagsFilterDropdownCss);
		cy.wrap(input).as('input');
		const valueContainer = input.closest('.ng-value-container');
		cy.wrap(valueContainer).as('valueContainer');
		if (valueContainer.textContent.includes(text)) {
			isTagSelected = true;
		}
	});
	if (!isTagSelected) {
		clickTagsFilterDropdown();
		const tag = Date.now().toString().slice(-5);
		cy.intercept('api/**/employee/**').as(`employeesUpdated-${tag}`);
		selectTagFromFilterDropdownByText(text);
		cy.wait(`@employeesUpdated-${tag}`);
	}
};

export const clickExpirationDropdown = () => {
	clickButton(ManageEmployeesPage.expirationDropdownCss);
};

export type ExpirationTime = '1 Day' | '7 Days' | '14 Days' | '30 Days' | 'Never';

export const selectExpirationFromDropdown = (text: ExpirationTime) => {
	clickElementByText(ManageEmployeesPage.expirationDropdownOptionCss, text);
};

export const setExpirationTime = (text: ExpirationTime) => {
	clickExpirationDropdown();
	selectExpirationFromDropdown(text);
};
