import * as loginPage from '../../Base/pages/Login.po';
import { LoginPageData } from '../../Base/pagedata/LoginPageData';
import * as editEmployeePage from '../../Base/pages/EditEmployee.po';
import { EditEmployeePageData } from '../../Base/pagedata/EditEmployeePageData';
import * as dashboardPage from '../../Base/pages/Dashboard.po';
import { CustomCommands } from '../../commands';
import { faker } from '@faker-js/faker';
import * as manageEmployeesPage from '../../Base/pages/ManageEmployees.po';
import * as organizationProjectsPage from '../../Base/pages/OrganizationProjects.po';
import { OrganizationProjectsPageData } from '../../Base/pagedata/OrganizationProjectsPageData';
import * as contactsLeadsPage from '../../Base/pages/ContactsLeads.po';
import { ContactsLeadsPageData } from '../../Base/pagedata/ContactsLeadsPageData';
import * as organizationTagsUserPage from '../../Base/pages/OrganizationTags.po';
import { OrganizationTagsPageData } from '../../Base/pagedata/OrganizationTagsPageData';

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

let firstName: string, lastName: string, username: string, password: string, employeeEmail: string, imgUrl: string;
let city: string,
	postcode: string,
	street: string,
	email: string,
	fullName: string,
	contactCity: string,
	contactPostcode: string,
	contactStreet: string;
let editUsername: string, editFirstName: string, editLastName: string, editEmail: string;
const website = ' ';

Given('Login with default credentials', () => {
	CustomCommands.login(loginPage, LoginPageData, dashboardPage);
});

And('User adds a new employee with random data', () => {
	firstName = faker.person.firstName();
	lastName = faker.person.lastName();
	username = faker.internet.userName();
	password = faker.internet.password();
	employeeEmail = faker.internet.exampleEmail();
	imgUrl = faker.image.avatar();

	CustomCommands.addEmployee(manageEmployeesPage, firstName, lastName, username, employeeEmail, password, imgUrl);
});

And('User adds project, tag, and contact', () => {
	fullName = faker.person.firstName() + ' ' + faker.person.lastName();
	email = faker.internet.exampleEmail();
	city = faker.location.city();
	postcode = faker.location.zipCode();
	street = faker.location.streetAddress();
	contactCity = faker.location.city();
	contactPostcode = faker.location.zipCode();
	contactStreet = faker.location.streetAddress();

	CustomCommands.addProject(organizationProjectsPage, OrganizationProjectsPageData);
	CustomCommands.addTag(organizationTagsUserPage, OrganizationTagsPageData);
	CustomCommands.addContact(
		fullName,
		email,
		contactCity,
		contactPostcode,
		contactStreet,
		website,
		contactsLeadsPage,
		ContactsLeadsPageData
	);

	cy.visit('/#/pages/dashboard/accounting');
});

When('User selects the employee', () => {
	editEmployeePage.selectEmployeeByName(`${firstName} ${lastName}`);
	editEmployeePage.editButtonVisible();
	editEmployeePage.clickEditButton();
});

When('User edits account data (username, email, first name, last name, language)', () => {
	editUsername = faker.internet.userName();
	editFirstName = faker.person.firstName();
	editLastName = faker.person.lastName();
	editEmail = faker.internet.exampleEmail();

	editEmployeePage.usernameInputVisible();
	editEmployeePage.enterUsernameInputData(editUsername);
	editEmployeePage.emailInputVisible();
	editEmployeePage.enterEmailData(editEmail);
	editEmployeePage.firstNameInputVisible();
	editEmployeePage.enterFirstNameData(editFirstName);
	editEmployeePage.lastNameInputVisible();
	editEmployeePage.enterLastNameData(editLastName);
	editEmployeePage.preferredLanguageDropdownVisible();
	editEmployeePage.clickPreferredLanguageDropdown();
	editEmployeePage.selectLanguageFromDropdown(EditEmployeePageData.preferredLanguage);
	editEmployeePage.tabButtonVisible();
	editEmployeePage.clickTabButton(1);
});

When('User edits network data (LinkedIn, GitHub, Upwork)', () => {
	editEmployeePage.linkedinInputVisible();
	editEmployeePage.enterLinkedinInputData(EditEmployeePageData.linkedin);
	editEmployeePage.githubInputVisible();
	editEmployeePage.enterGithubInputData(EditEmployeePageData.github);
	editEmployeePage.upworkInputVisible();
	editEmployeePage.enterUpworkInputData(EditEmployeePageData.upwork);
	editEmployeePage.tabButtonVisible();
	editEmployeePage.clickTabButton(2);
});

When('User edits employment data (description)', () => {
	editEmployeePage.descriptionInputVisible();
	editEmployeePage.enterDescriptionInputData(EditEmployeePageData.description);
	editEmployeePage.clickTabButton(3);
});

When('User edits hiring data (offer date, accept date)', () => {
	editEmployeePage.offerDateInputVisible();
	editEmployeePage.enterOfferDateData();
	editEmployeePage.acceptDateInputVisible();
	editEmployeePage.enterAcceptDateData();
	editEmployeePage.clickTabButton(4);
});

When('User edits location data (country, city, postcode, street)', () => {
	editEmployeePage.countryDropdownVisible();
	editEmployeePage.clickCountryDropdown();
	editEmployeePage.selectCountryFromDropdown(EditEmployeePageData.country);
	editEmployeePage.cityInputVisible();
	editEmployeePage.enterCityInputData(city);
	editEmployeePage.postcodeInputVisible();
	editEmployeePage.enterPostcodeInputData(postcode);
	editEmployeePage.streetInputVisible();
	editEmployeePage.enterStreetInputData(street);
	editEmployeePage.clickTabButton(5);
});

When('User edits rates data (pay period, weekly limit, bill rate)', () => {
	editEmployeePage.payPeriodDropdownVisible();
	editEmployeePage.clickPayPeriodDropdown();
	editEmployeePage.selectPayPeriodOption(EditEmployeePageData.payPeriod);
	editEmployeePage.weeklyLimitInputVisible();
	editEmployeePage.enterWeeklyLimitInputData(EditEmployeePageData.weeklyLimits);
	editEmployeePage.billRateInputVisible();
	editEmployeePage.enterBillRateInputData(EditEmployeePageData.billRate);
	editEmployeePage.clickTabButton(6);
});

When('User adds project to employee', () => {
	editEmployeePage.addProjectOrContactButtonVisible();
	editEmployeePage.clickAddProjectOrContactButton();
	editEmployeePage.projectOrContactDropdownVisible();
	editEmployeePage.clickProjectOrContactDropdown();
	editEmployeePage.selectProjectOrContactFromDropdown(0);
	editEmployeePage.saveProjectOrContactButtonVisible();
	editEmployeePage.clickSaveProjectOrContactButton();
	editEmployeePage.verifyProjectOrContactExist();
	editEmployeePage.clickTabButton(7);
});

When('User adds contact to employee', () => {
	editEmployeePage.addProjectOrContactButtonVisible();
	editEmployeePage.clickAddProjectOrContactButton();
	editEmployeePage.projectOrContactDropdownVisible();
	editEmployeePage.clickProjectOrContactDropdown();
	editEmployeePage.selectProjectOrContactFromDropdown(0);
	editEmployeePage.saveProjectOrContactButtonVisible();
	editEmployeePage.clickSaveProjectOrContactButton();
	editEmployeePage.verifyProjectOrContactExist();
	editEmployeePage.clickTabButton(0);
});

Then('Employee data should be saved successfully', () => {
	editEmployeePage.saveBtnExists();
	editEmployeePage.saveBtnClick();
	editEmployeePage.waitMessageToHide();
	editEmployeePage.verifyEmployee(`${firstName} ${lastName}`);
});
