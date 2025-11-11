import dayjs from 'dayjs';
import {
	verifyElementIsVisible,
	clickButton,
	clickButtonByIndex,
	clickElementByText,
	clearField,
	enterInput,
	clickKeyboardBtnByKeycode,
	waitElementToHide,
	verifyText,
	verifyTextNotExisting,
	clickButtonDouble,
	waitElementToShowAndHide
} from '../utils/util';
import { TimeOffPage } from '../pageobjects/TimeOffPageObject';

export const visit = (options = {}) => {
	cy.intercept('GET', '/api/time-off-request/*').as('getTimeOffRequest');
	cy.visit('/#/pages/employees/time-off', options);
	cy.wait('@getTimeOffRequest');
};

export const requestButtonVisible = () => {
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.requestTimeOffButtonName).should('be.visible');
};

export const clickRequestButton = () => {
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.requestTimeOffButtonName).click();
};

export const employeeSelectorVisible = () => {
	cy.intercept('GET', '/api/employee/working*').as('getUsersXhr');
	verifyElementIsVisible(TimeOffPage.employeeDropdownCss);
	cy.wait('@getUsersXhr');
};

export const clickEmployeeSelector = () => {
	clickButton(TimeOffPage.employeeDropdownCss);
	clickButtonDouble(TimeOffPage.employeeDropdownCss);
};

export const employeeDropdownVisible = () => {
	verifyElementIsVisible(TimeOffPage.employeeDropdownOptionCss);
};

export const selectEmployeeFromDropdown = (index) => {
	clickButtonByIndex(TimeOffPage.employeeDropdownOptionCss, index);
};

export const selectTimeOffPolicyVisible = () => {
	verifyElementIsVisible(TimeOffPage.timeOffPolicyDropdownCss);
};

export const clickTimeOffPolicyDropdown = () => {
	clickButton(TimeOffPage.timeOffPolicyDropdownCss);
};

export const timeOffPolicyDropdownOptionVisible = () => {
	verifyElementIsVisible(TimeOffPage.timeOffPolicyDropdownOptionCss);
};

export const selectTimeOffPolicy = (data) => {
	clickElementByText(TimeOffPage.timeOffPolicyDropdownOptionCss, data);
};

export const startDateInputVisible = () => {
	verifyElementIsVisible(TimeOffPage.startDateInputCss);
};

export const enterStartDateData = () => {
	clearField(TimeOffPage.startDateInputCss);
	const date = dayjs().add(1, 'days').format('MMM D, YYYY');
	enterInput(TimeOffPage.startDateInputCss, date);
};

export const endDateInputVisible = () => {
	verifyElementIsVisible(TimeOffPage.startDateInputCss);
};

export const enterEndDateData = () => {
	clearField(TimeOffPage.endDateInputCss);
	const date = dayjs().add(5, 'days').format('MMM D, YYYY');
	enterInput(TimeOffPage.endDateInputCss, `${date}`);
	cy.press(Cypress.Keyboard.Keys.TAB);
};

export const descriptionInputVisible = () => {
	verifyElementIsVisible(TimeOffPage.descriptionInputCss);
};

export const enterDescriptionInputData = (data) => {
	clearField(TimeOffPage.descriptionInputCss);
	enterInput(TimeOffPage.descriptionInputCss, data);
};

export const saveRequestButtonVisible = () => {
	cy.get(TimeOffPage.dialogCardActionsCss).contains(TimeOffPage.saveButtonName).should('be.visible');
};

export const clickSaveRequestButton = () => {
	cy.get(TimeOffPage.dialogCardActionsCss).contains(TimeOffPage.saveButtonName).click();
};

export const addHolidaysButtonVisible = () => {
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.addHolidaysButtonName).should('be.visible');
};

export const clickAddHolidaysButton = () => {
	cy.intercept('GET', '/api/employee*').as('waitForm');
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.addHolidaysButtonName).click();
	cy.wait('@waitForm');
};

export const selectHolidayNameVisible = () => {
	verifyElementIsVisible(TimeOffPage.holidayNameSelectCss);
};

export const clickSelectHolidayName = () => {
	clickButton(TimeOffPage.holidayNameSelectCss);
};

export const selectHolidayOption = (text) => {
	clickElementByText(TimeOffPage.selectHolidayDropdownOptionCss, text);
};

export const selectEmployeeDropdownVisible = () => {
	verifyElementIsVisible(TimeOffPage.selectEmployeeCss);
};

export const clickSelectEmployeeDropdown = () => {
	clickButton(TimeOffPage.selectEmployeeCss);
};

export const selectEmployeeFromHolidayDropdown = (index) => {
	clickButtonByIndex(TimeOffPage.selectEmployeeDropdownOptionCss, index);
};

export const startHolidayDateInputVisible = () => {
	verifyElementIsVisible(TimeOffPage.startHolidayDateCss);
};

export const enterStartHolidayDate = () => {
	clearField(TimeOffPage.startHolidayDateCss);
	const date = dayjs().add(1, 'years').startOf('year').format('MMM D, YYYY');
	enterInput(TimeOffPage.startHolidayDateCss, date);
};

export const endHolidayDateInputVisible = () => {
	verifyElementIsVisible(TimeOffPage.endHolidayDateCss);
};

export const enterEndHolidayDate = () => {
	clearField(TimeOffPage.endHolidayDateCss);
	const date = dayjs().add(1, 'years').startOf('year').add(1, 'days').format('MMM D, YYYY');
	enterInput(TimeOffPage.endHolidayDateCss, date);
};

export const clickKeyboardButtonByKeyCode = (keycode) => {
	clickKeyboardBtnByKeycode(keycode);
};

export const saveButtonVisible = () => {
	verifyElementIsVisible(TimeOffPage.saveButtonCss);
};

export const clickSaveButton = () => {
	clickButton(TimeOffPage.saveButtonCss);
};

export const timeOffTableRowVisible = () => {
	verifyElementIsVisible(TimeOffPage.selectTableRowCss);
};

export const selectTimeOffTableRow = (index) => {
	clickButtonByIndex(TimeOffPage.selectTableRowCss, index);
};

export const editTimeOffRequestBtnVisible = () => {
	verifyElementIsVisible(TimeOffPage.editTimeOfRequestButtonCss);
};

export const clickEditTimeOffRequestButton = () => {
	clickButton(TimeOffPage.editTimeOfRequestButtonCss);
};

export const deleteTimeOffBtnVisible = () => {
	verifyElementIsVisible(TimeOffPage.deleteTimeOfRequestButtonCss);
};

export const clickDeleteTimeOffButton = () => {
	clickButton(TimeOffPage.deleteTimeOfRequestButtonCss);
};

export const seeMoreButtonVisible = () => {
	verifyElementIsVisible(TimeOffPage.seeMoreButtonCss);
};

export const clickSeeMoreButton = () => {
	clickButton(TimeOffPage.seeMoreButtonCss);
};
export const clickSeeMoreButtonIfVisible = () => {
	cy.document().then((doc) => {
		const seeMoreButton = doc.querySelector(TimeOffPage.seeMoreButtonCss);
		if (seeMoreButton) {
			clickButton(seeMoreButton);
		}
	});
};

export const denyTimeOffButtonVisible = () => {
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.denyButtonName).should('be.visible');
};

export const clickDenyTimeOffButton = () => {
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.denyButtonName).click();
};

export const approveTimeOffButtonVisible = () => {
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.approveButtonName).should('be.visible');
};

export const clickApproveTimeOffButton = () => {
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.approveButtonName).click();
};

export const confirmDeleteTimeOffBtnVisible = () => {
	verifyElementIsVisible(TimeOffPage.confirmDeleteTimeOfButtonCss);
};

export const clickConfirmDeleteTimeOffButton = () => {
	clickButton(TimeOffPage.confirmDeleteTimeOfButtonCss);
};

export const timeOffSettingsButtonVisible = () => {
	verifyElementIsVisible(TimeOffPage.timeOffSettingsButtonCss);
};

export const clickTimeOffSettingsButton = () => {
	clickButton(TimeOffPage.timeOffSettingsButtonCss);
};

export const addNewPolicyButtonVisible = () => {
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.addNewPolicyButtonName).should('be.visible');
};

export const clickAddNewPolicyButton = () => {
	cy.get(TimeOffPage.actionsBarCss).contains(TimeOffPage.addNewPolicyButtonName).click();
};

export const policyInputFieldVisible = () => {
	verifyElementIsVisible(TimeOffPage.addNewPolicyInputCss);
};

export const enterNewPolicyName = (data) => {
	clearField(TimeOffPage.addNewPolicyInputCss);
	enterInput(TimeOffPage.addNewPolicyInputCss, data);
};

export const waitMessageToHide = () => {
	waitElementToShowAndHide(TimeOffPage.toastrMessageCss);
};

export const verifyPolicyExists = (text) => {
	verifyText(TimeOffPage.verifyPolicyCss, text);
};

export const verifyPolicyIsDeleted = (text) => {
	verifyTextNotExisting(TimeOffPage.verifyPolicyCss, text);
};

export const backButtonVisible = () => {
	verifyElementIsVisible(TimeOffPage.backButtonCss);
};

export const clickBackButton = () => {
	clickButton(TimeOffPage.backButtonCss);
};

export const verifyEmployeeSelectorVisible = () => {
	verifyElementIsVisible(TimeOffPage.employeeSelectorCss);
};

export const clickEmployeeSelectorDropdown = () => {
	clickButton(TimeOffPage.employeeSelectorCss);
};

export const verifyTimeOffPolicyVisible = () => {
	verifyElementIsVisible(TimeOffPage.timeOffPolicySelectorCss);
};

export const verifyRowIsDenied = (index) => {
	cy.get(TimeOffPage.selectTableRowCss)
		.eq(index)
		.contains(/denied/i)
		.should('be.visible');
};

export const verifyRowIsApproved = (index) => {
	cy.get(TimeOffPage.selectTableRowCss)
		.eq(index)
		.contains(/approved/i)
		.should('be.visible');
};

export const clickTimeOffPolicySelector = () => {
	clickButton(TimeOffPage.timeOffPolicySelectorCss);
};

export const employeeSelectorVisibleAgain = () => {
	verifyElementIsVisible(TimeOffPage.employeeDropdownCss);
};

export const countRows = () => {
	cy.document().then((doc) => {
		const rows = doc.querySelectorAll(TimeOffPage.selectTableRowCss);
		cy.wrap(rows.length).as('lastRowsCount');
	});
};

export const verifyARowWasDeleted = () => {
	cy.get('@lastRowsCount').then((lastRowsCount: any) => {
		cy.get(TimeOffPage.selectTableRowCss).should('have.length', lastRowsCount - 1);
	});
};
