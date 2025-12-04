import * as loginPage from '../support/Base/pages/Login.po';
import { LoginPageData } from '../support/Base/pagedata/LoginPageData';
import * as timesheetsPage from '../support/Base/pages/Timesheets.po';
import * as dashboardPage from '../support/Base/pages/Dashboard.po';
import { TimesheetsPageData } from '../support/Base/pagedata/TimesheetsPageData';
import * as organizationProjectsPage from '../support/Base/pages/OrganizationProjects.po';
import { OrganizationProjectsPageData } from '../support/Base/pagedata/OrganizationProjectsPageData';
import * as addTaskPage from '../support/Base/pages/AddTasks.po';
import { AddTasksPageData } from '../support/Base/pagedata/AddTasksPageData';
import * as organizationTagsUserPage from '../support/Base/pages/OrganizationTags.po';
import { OrganizationTagsPageData } from '../support/Base/pagedata/OrganizationTagsPageData';
import * as clientsPage from '../support/Base/pages/Clients.po';
import { faker } from '@faker-js/faker';
import { ClientsData } from '../support/Base/pagedata/ClientsPageData';
import { CustomCommands } from '../support/commands';
import * as manageEmployeesPage from '../support/Base/pages/ManageEmployees.po';

let firstName = ' ';
let lastName = ' ';
let username = ' ';
let password = ' ';
let employeeEmail = ' ';
let imgUrl = ' ';

let email = ' ';
let fullName = ' ';
let city = ' ';
let postcode = ' ';
let street = ' ';
let website = ' ';

describe('Timesheets test', { testIsolation: false }, () => {
	before(() => {
		email = faker.internet.exampleEmail();
		fullName = faker.person.firstName() + ' ' + faker.person.lastName();
		city = faker.location.city();
		postcode = faker.location.zipCode();
		street = faker.location.streetAddress();
		website = faker.internet.url();

		firstName = faker.person.firstName();
		lastName = faker.person.lastName();
		username = faker.internet.userName();
		password = faker.internet.password();
		employeeEmail = faker.internet.exampleEmail();
		imgUrl = faker.image.avatar();

		CustomCommands.login(loginPage, LoginPageData, dashboardPage);
		CustomCommands.addProject(organizationProjectsPage, OrganizationProjectsPageData);
		CustomCommands.addTag(organizationTagsUserPage, OrganizationTagsPageData);
		CustomCommands.addEmployee(manageEmployeesPage, firstName, lastName, username, employeeEmail, password, imgUrl);
		CustomCommands.addClient(clientsPage, fullName, email, website, city, postcode, street, ClientsData);
		CustomCommands.addTask(addTaskPage, AddTasksPageData);
		timesheetsPage.visit();
	});
	it('Should be able to add time', () => {
		timesheetsPage.addTimeButtonVisible();
		timesheetsPage.clickAddTimeButton();
		timesheetsPage.selectEmployeeDropdownVisible();
		timesheetsPage.clickSelectEmployeeDropdown();
		timesheetsPage.selectEmployeeFromDropdown(0);
		timesheetsPage.dateInputVisible();
		timesheetsPage.enterDateData();
		timesheetsPage.clickKeyboardButtonByKeyCode(9);
		timesheetsPage.selectProjectDropdownVisible();
		timesheetsPage.clickSelectProjectDropdown();
		timesheetsPage.selectProjectFromDropdown(TimesheetsPageData.defaultProjectName);
		timesheetsPage.clientDropdownVisible();
		timesheetsPage.clickClientDropdown();
		timesheetsPage.selectClientFromDropdown();
		timesheetsPage.taskDropdownVisible();
		timesheetsPage.clickTaskDropdown();
		timesheetsPage.selectTaskFromDropdown();
		timesheetsPage.addTimeLogDescriptionVisible();
		timesheetsPage.enterTimeLogDescriptionData(TimesheetsPageData.defaultDescription);
		timesheetsPage.saveTimeLogButtonVisible();
		timesheetsPage.clickSaveTimeLogButton();
		timesheetsPage.waitMessageToHide();
	});
	it('Should be able to view time', () => {
		timesheetsPage.timesheetTableVisible();
		timesheetsPage.selectTimesheetTableRow(0);
		timesheetsPage.viewEmployeeTimeLogButtonVisible();
		timesheetsPage.clickViewEmployeeTimeLogButton(0);
		timesheetsPage.closeAddTimeLogPopoverButtonVisible();
		timesheetsPage.clickCloseAddTimeLogPopoverButton();
	});
	it('Should be able to edit time', () => {
		timesheetsPage.editEmployeeTimeLogButtonVisible();
		timesheetsPage.clickEditEmployeeTimeLogButton();
		timesheetsPage.dateInputVisible();
		timesheetsPage.enterDateData();
		timesheetsPage.clickKeyboardButtonByKeyCode(9);
		timesheetsPage.addTimeLogDescriptionVisible();
		timesheetsPage.enterTimeLogDescriptionData(TimesheetsPageData.defaultDescription);
		timesheetsPage.saveTimeLogButtonVisible();
		timesheetsPage.clickSaveTimeLogButton();
	});
	it('Should be able to delete time', () => {
		timesheetsPage.waitMessageToHide();
		timesheetsPage.timesheetTableVisible();
		timesheetsPage.selectTimesheetTableRow(0);
		timesheetsPage.deleteEmployeeTimeLogButtonVisible();
		timesheetsPage.clickDeleteEmployeeTimeLogButton(0);
		timesheetsPage.confirmDeleteButtonVisible();
		timesheetsPage.clickConfirmDeleteButton();
	});
});
