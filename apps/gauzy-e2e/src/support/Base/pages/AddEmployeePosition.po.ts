import {
	verifyElementIsVisible,
	clickButtonByIndex,
	clickButton,
	clearField,
	enterInput,
	clickKeyboardBtnByKeycode,
	getLastElement,
	waitElementToHide
} from '../utils/util';
import { AddEmployeePositionPage } from '../pageobjects/AddEmployeePositionPageObject';

export const gridBtnExists = () => {
	verifyElementIsVisible(AddEmployeePositionPage.gridButtonCss);
};

export const gridBtnClick = (index) => {
	clickButtonByIndex(AddEmployeePositionPage.gridButtonCss, index);
};

export const addNewPositionButtonVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.addNewPositionButtonCss);
};

export const clickAddNewPositionButton = () => {
	clickButton(AddEmployeePositionPage.addNewPositionButtonCss);
};

export const positionTableVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.positionTableCss);
};

export const clickPositionTableRow = (index: number) => {
	clickButtonByIndex(AddEmployeePositionPage.positionTableCss, index);
};

export const cancelNewPositionButtonVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.cancelNewPositionButtonCss);
};

export const clickCancelNewPositionButton = () => {
	clickButton(AddEmployeePositionPage.cancelNewPositionButtonCss);
};

export const newPositionInputVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.newPositionInputCss);
};

export const enterNewPositionData = (data: string) => {
	clickButton(AddEmployeePositionPage.newPositionInputCss);
	enterInput(AddEmployeePositionPage.newPositionInputCss, data);
};

export const tagsMultiSelectVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.tagsSelectCss);
};

export const clickTagsMultiSelect = () => {
	clickButton(AddEmployeePositionPage.tagsSelectCss);
};

export const selectTagsFromDropdown = (index: number) => {
	clickButtonByIndex(AddEmployeePositionPage.tagsSelectOptionCss, index);
};

export const clickKeyboardButtonByKeyCode = (keycode: number) => {
	clickKeyboardBtnByKeycode(keycode);
};

export const savePositionButtonVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.saveNewPositionButtonCss);
};

export const clickSavePositionButton = () => {
	cy.get(AddEmployeePositionPage.saveNewPositionButtonCss).contains('Save').click();
};

export const updatePositionButtonVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.updatePositionButtonCss);
};

export const clickUpdatePositionButton = () => {
	cy.get(AddEmployeePositionPage.updatePositionButtonCss).contains('Update').click();
};

export const editEmployeePositionButtonVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.editEmployeePositionButtonCss);
};

export const clickEditEmployeePositionButton = () => {
	clickButton(AddEmployeePositionPage.editEmployeePositionButtonCss);
};

export const editEmployeePositionInputVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.editPositionInputCss);
};

export const enterEditPositionData = (data: string) => {
	clearField(AddEmployeePositionPage.editPositionInputCss);
	enterInput(AddEmployeePositionPage.editPositionInputCss, data);
};

export const deletePositionButtonVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.removeEmployeePositionButtonCss);
};

export const clickDeletePositionButton = () => {
	getLastElement(AddEmployeePositionPage.removeEmployeePositionButtonCss);
};

export const confirmDeleteButtonVisible = () => {
	verifyElementIsVisible(AddEmployeePositionPage.confirmDeletePositionButtonCss);
};

export const clickConfirmDeletePositionButton = () => {
	clickButton(AddEmployeePositionPage.confirmDeletePositionButtonCss);
};

export const waitMessageToHide = () => {
	waitElementToHide(AddEmployeePositionPage.toastrMessageCss);
};
