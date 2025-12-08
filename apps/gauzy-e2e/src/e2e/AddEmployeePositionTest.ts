import * as loginPage from '../support/Base/pages/Login.po';
import { LoginPageData } from '../support/Base/pagedata/LoginPageData';
import * as addEmployeePositionPage from '../support/Base/pages/AddEmployeePosition.po';
import { AddEmployeePositionPageData } from '../support/Base/pagedata/AddEmployeePositionPageData';
import * as dashboardPage from '../support/Base/pages/Dashboard.po';
import { CustomCommands } from '../support/commands';

describe('Add employee position test', { testIsolation: false }, () => {
	before(() => {
		CustomCommands.login(loginPage, LoginPageData, dashboardPage);
		cy.visit('/#/pages/employees/positions');
	});
	it('Should be able to add new employee position', () => {
		addEmployeePositionPage.gridBtnExists();
		addEmployeePositionPage.gridBtnClick(1);
		addEmployeePositionPage.addNewPositionButtonVisible();
		addEmployeePositionPage.clickAddNewPositionButton();
		addEmployeePositionPage.cancelNewPositionButtonVisible();
		addEmployeePositionPage.clickCancelNewPositionButton();
		addEmployeePositionPage.clickAddNewPositionButton();
		addEmployeePositionPage.newPositionInputVisible();
		addEmployeePositionPage.enterNewPositionData(AddEmployeePositionPageData.fullStackDeveloper);
		addEmployeePositionPage.tagsMultiSelectVisible();
		addEmployeePositionPage.clickTagsMultiSelect();
		addEmployeePositionPage.selectTagsFromDropdown(0);
		addEmployeePositionPage.clickKeyboardButtonByKeyCode(9);
		addEmployeePositionPage.savePositionButtonVisible();
		addEmployeePositionPage.clickSavePositionButton();
		addEmployeePositionPage.waitMessageToHide();
	});
	it('Should be able to edit employee position', () => {
		addEmployeePositionPage.positionTableVisible();
		addEmployeePositionPage.clickPositionTableRow(0);
		addEmployeePositionPage.clickEditEmployeePositionButton();
		addEmployeePositionPage.editEmployeePositionInputVisible();
		addEmployeePositionPage.enterEditPositionData(AddEmployeePositionPageData.midLevelWebDeveloper);
		addEmployeePositionPage.tagsMultiSelectVisible();
		addEmployeePositionPage.clickTagsMultiSelect();
		addEmployeePositionPage.selectTagsFromDropdown(0);
		addEmployeePositionPage.clickKeyboardButtonByKeyCode(9);
		addEmployeePositionPage.updatePositionButtonVisible();
		addEmployeePositionPage.clickUpdatePositionButton();
		addEmployeePositionPage.waitMessageToHide();
	});
	it('Should be able to delete employee position', () => {
		addEmployeePositionPage.positionTableVisible();
		addEmployeePositionPage.clickPositionTableRow(1);
		addEmployeePositionPage.deletePositionButtonVisible();
		addEmployeePositionPage.clickDeletePositionButton();
		addEmployeePositionPage.confirmDeleteButtonVisible();
		addEmployeePositionPage.clickConfirmDeletePositionButton();
	});
});
