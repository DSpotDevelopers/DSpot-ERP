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
	clickButtonWithDelay,
	clickFirst
} from '../utils/util';
import { TimesheetsPage } from '../pageobjects/TimesheetsPageObject';

export const visit = (options = {}) => {
	cy.intercept('GET', /api\/timesheet\/time-log\/pagination.*/).as('getTimeLogsRequest');
	cy.visit('/#/pages/employees/timesheets/daily', options);
	cy.wait('@getTimeLogsRequest');
};

export const addTimeButtonVisible = () => {
	verifyElementIsVisible(TimesheetsPage.addTimeButtonCss);
};

export const clickAddTimeButton = () => {
	clickButton(TimesheetsPage.addTimeButtonCss);
};

export const selectEmployeeDropdownVisible = () => {
	verifyElementIsVisible(TimesheetsPage.selectEmployeeCss);
};

export const clickSelectEmployeeDropdown = () => {
	clickButtonWithDelay(TimesheetsPage.selectEmployeeCss);
};

export const selectEmployeeFromDropdown = (index) => {
	clickButtonByIndex(TimesheetsPage.selectEmployeeDropdownOptionCss, index);
};

export const clickKeyboardButtonByKeyCode = (keycode) => {
	clickKeyboardBtnByKeycode(keycode);
};

export const dateInputVisible = () => {
	verifyElementIsVisible(TimesheetsPage.dateInputCss);
};

export const enterDateData = () => {
	clearField(TimesheetsPage.dateInputCss);
	const date = dayjs().format('MMM D, YYYY');
	enterInput(TimesheetsPage.dateInputCss, date);
};

export const clientDropdownVisible = () => {
	verifyElementIsVisible(TimesheetsPage.clientDropdownCss);
};

export const clickClientDropdown = () => {
	clickButton(TimesheetsPage.clientDropdownCss);
};

export const selectClientFromDropdown = () => {
	clickFirst(TimesheetsPage.clientDropdownOptionCss);
};

export const selectProjectDropdownVisible = () => {
	verifyElementIsVisible(TimesheetsPage.projectDropdownCss);
};

export const clickSelectProjectDropdown = () => {
	clickButton(TimesheetsPage.projectDropdownCss);
};

export const selectProjectFromDropdown = (text: string) => {
	clickElementByText(TimesheetsPage.dropdownOptionCss, text);
};

export const taskDropdownVisible = () => {
	verifyElementIsVisible(TimesheetsPage.taskDropdownCss);
};

export const clickTaskDropdown = () => {
	clickButton(TimesheetsPage.taskDropdownCss);
};

export const selectTaskFromDropdown = () => {
	clickFirst(TimesheetsPage.clientDropdownOptionCss);
};

export const addTimeLogDescriptionVisible = () => {
	verifyElementIsVisible(TimesheetsPage.descriptionTextareaCss);
};

export const enterTimeLogDescriptionData = (data) => {
	clearField(TimesheetsPage.descriptionTextareaCss);
	enterInput(TimesheetsPage.descriptionTextareaCss, data);
};

export const saveTimeLogButtonVisible = () => {
	verifyElementIsVisible(TimesheetsPage.saveTimeButtonCss);
};

export const clickSaveTimeLogButton = () => {
	clickButton(TimesheetsPage.saveTimeButtonCss);
};

export const closeAddTimeLogPopoverButtonVisible = () => {
	verifyElementIsVisible(TimesheetsPage.closeAddTimeLogPopoverCss);
};

export const clickCloseAddTimeLogPopoverButton = () => {
	cy.get(TimesheetsPage.closeAddTimeLogPopoverCss).last().click({ force: true });
};

export const viewEmployeeTimeLogButtonVisible = () => {
	verifyElementIsVisible(TimesheetsPage.viewEmployeeTimeCss);
};

export const clickViewEmployeeTimeLogButton = (index: number) => {
	clickButtonByIndex(TimesheetsPage.viewEmployeeTimeCss, index);
};

export const editEmployeeTimeLogButtonVisible = () => {
	verifyElementIsVisible(TimesheetsPage.editEmployeeTimeCss);
};

export const clickEditEmployeeTimeLogButton = () => {
	clickButton(TimesheetsPage.editEmployeeTimeCss);
};

export const deleteEmployeeTimeLogButtonVisible = () => {
	verifyElementIsVisible(TimesheetsPage.deleteEmployeeTimeCss);
};

export const clickDeleteEmployeeTimeLogButton = (index) => {
	clickButtonByIndex(TimesheetsPage.deleteEmployeeTimeCss, index);
};

export const confirmDeleteButtonVisible = () => {
	verifyElementIsVisible(TimesheetsPage.confirmDeleteButtonCss);
};

export const clickConfirmDeleteButton = () => {
	clickButton(TimesheetsPage.confirmDeleteButtonCss);
};

export const waitMessageToHide = () => {
	waitElementToHide(TimesheetsPage.toastrMessageCss);
};

export const verifyTimeExists = (text) => {
	verifyText(TimesheetsPage.verifyTimeCss, text);
};

export const verifyTimeIsDeleted = (text) => {
	verifyTextNotExisting(TimesheetsPage.verifyTimeCss, text);
};

export const doubleClickClientDropdown = () => {
	clickButtonDouble(TimesheetsPage.clientDropdownCss);
};

export const timesheetTableVisible = () => {
	verifyElementIsVisible(TimesheetsPage.selectTableRowCss);
};

export const selectTimesheetTableRow = (index: number) => {
	clickButtonByIndex(TimesheetsPage.selectTableRowCss, index);
};

export const selectTimesheetTableRowByText = (text: string) => {
	clickElementByText(TimesheetsPage.selectTableRowCss, text);
};
