import dayjs from 'dayjs';
import {
	enterInput,
	verifyElementIsVisible,
	clickButton,
	clickElementByText,
	clearField,
	clickButtonByIndex,
	waitElementToHide,
	verifyText
} from '../utils/util';
import { EditEmployeePage } from '../pageobjects/EditEmployeePageObject';

export const selectEmployeeByName = (name: string) => {
	clickElementByText(EditEmployeePage.employeeCss, name);
};

export const editButtonVisible = () => {
	verifyElementIsVisible(EditEmployeePage.editButtonCss);
};

export const clickEditButton = () => {
	clickButton(EditEmployeePage.editButtonCss);
};

export const usernameInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.usernameInputCss);
};

export const enterUsernameInputData = (data: string) => {
	clearField(EditEmployeePage.usernameInputCss);
	enterInput(EditEmployeePage.usernameInputCss, data);
};

export const firstNameInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.firstNameInputCss);
};

export const enterFirstNameData = (data: string) => {
	clearField(EditEmployeePage.firstNameInputCss);
	enterInput(EditEmployeePage.firstNameInputCss, data);
};

export const lastNameInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.lastNameInputCss);
};

export const enterLastNameData = (data: string) => {
	clearField(EditEmployeePage.lastNameInputCss);
	enterInput(EditEmployeePage.lastNameInputCss, data);
};

export const emailInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.emailInputCss);
};

export const enterEmailData = (data: string) => {
	clearField(EditEmployeePage.emailInputCss);
	enterInput(EditEmployeePage.emailInputCss, data);
};

export const preferredLanguageDropdownVisible = () => {
	verifyElementIsVisible(EditEmployeePage.preferredLanguageCss);
};

export const clickPreferredLanguageDropdown = () => {
	clickButton(EditEmployeePage.preferredLanguageCss);
};

export const selectLanguageFromDropdown = (text: string) => {
	clickElementByText(EditEmployeePage.preferredLanguageOptionCss, text);
};

export const tabButtonVisible = () => {
	verifyElementIsVisible(EditEmployeePage.tabButtonCss);
};

export const clickTabButton = (index: number) => {
	cy.get(EditEmployeePage.tabButtonCss).eq(index).find(EditEmployeePage.tabCss).click();
};

export const linkedinInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.linkedInInputCss);
};

export const enterLinkedinInputData = (data: string) => {
	clearField(EditEmployeePage.linkedInInputCss);
	enterInput(EditEmployeePage.linkedInInputCss, data);
};

export const githubInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.githubInputCss);
};

export const enterGithubInputData = (data: string) => {
	clearField(EditEmployeePage.githubInputCss);
	enterInput(EditEmployeePage.githubInputCss, data);
};

export const upworkInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.upworkInputCss);
};

export const enterUpworkInputData = (data: string) => {
	clearField(EditEmployeePage.upworkInputCss);
	enterInput(EditEmployeePage.upworkInputCss, data);
};

export const descriptionInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.descriptionInputCss);
};

export const enterDescriptionInputData = (data: string) => {
	clearField(EditEmployeePage.descriptionInputCss);
	enterInput(EditEmployeePage.descriptionInputCss, data);
};

export const offerDateInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.offerDateInputCss);
};

export const enterOfferDateData = () => {
	clearField(EditEmployeePage.offerDateInputCss);
	const date = dayjs().add(1, 'd').format('MMM D, YYYY');
	enterInput(EditEmployeePage.offerDateInputCss, date);
};

export const acceptDateInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.acceptDateInputCss);
};

export const enterAcceptDateData = () => {
	clearField(EditEmployeePage.acceptDateInputCss);
	const date = dayjs().add(2, 'd').format('MMM D, YYYY');
	enterInput(EditEmployeePage.acceptDateInputCss, date);
};

export const countryDropdownVisible = () => {
	verifyElementIsVisible(EditEmployeePage.countryDropdownCss);
};

export const clickCountryDropdown = () => {
	clickButton(EditEmployeePage.countryDropdownCss);
};

export const selectCountryFromDropdown = (text: string) => {
	clickElementByText(EditEmployeePage.dropdownOptionCss, text);
};

export const cityInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.cityInputCss);
};

export const enterCityInputData = (data: string) => {
	clearField(EditEmployeePage.cityInputCss);
	enterInput(EditEmployeePage.cityInputCss, data);
};

export const postcodeInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.postCodeInputCss);
};

export const enterPostcodeInputData = (data: string) => {
	clearField(EditEmployeePage.postCodeInputCss);
	enterInput(EditEmployeePage.postCodeInputCss, data);
};

export const streetInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.addressInputCss);
};

export const enterStreetInputData = (data: string) => {
	clearField(EditEmployeePage.addressInputCss);
	enterInput(EditEmployeePage.addressInputCss, data);
};

export const payPeriodDropdownVisible = () => {
	verifyElementIsVisible(EditEmployeePage.payPeriodDropdownCss);
};

export const clickPayPeriodDropdown = () => {
	clickButton(EditEmployeePage.payPeriodDropdownCss);
};

export const selectPayPeriodOption = (text: string) => {
	clickElementByText(EditEmployeePage.dropdownOptionAnotherCss, text);
};

export const weeklyLimitInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.weeklyLimitInputCss);
};

export const enterWeeklyLimitInputData = (data: number) => {
	clearField(EditEmployeePage.weeklyLimitInputCss);
	enterInput(EditEmployeePage.weeklyLimitInputCss, data);
};

export const billRateInputVisible = () => {
	verifyElementIsVisible(EditEmployeePage.billRateValueInputCss);
};

export const enterBillRateInputData = (data: number) => {
	clearField(EditEmployeePage.billRateValueInputCss);
	enterInput(EditEmployeePage.billRateValueInputCss, data);
};

export const addProjectOrContactButtonVisible = () => {
	verifyElementIsVisible(EditEmployeePage.addProjectOrContactButtonCss);
};

export const clickAddProjectOrContactButton = () => {
	clickButton(EditEmployeePage.addProjectOrContactButtonCss);
};

export const projectOrContactDropdownVisible = () => {
	verifyElementIsVisible(EditEmployeePage.projectOrContactsDropdownCss);
};

export const clickProjectOrContactDropdown = () => {
	clickButton(EditEmployeePage.projectOrContactsDropdownCss);
};

export const selectProjectOrContactFromDropdown = (index: number) => {
	clickButtonByIndex(EditEmployeePage.projectOrContactDropdownOptionCss, index);
};

export const saveProjectOrContactButtonVisible = () => {
	verifyElementIsVisible(EditEmployeePage.saveProjectOrContactButtonCss);
};

export const clickSaveProjectOrContactButton = () => {
	clickButton(EditEmployeePage.saveProjectOrContactButtonCss);
};

export const verifyProjectOrContactExist = () => {
	verifyElementIsVisible(EditEmployeePage.verifyProjectOrContactCss);
};

export const saveBtnExists = () => {
	verifyElementIsVisible(EditEmployeePage.saveButtonCss);
};

export const saveBtnClick = () => {
	clickButton(EditEmployeePage.saveButtonCss);
};

export const verifyEmployee = (text: string) => {
	verifyText(EditEmployeePage.verifyEmployeeCss, text);
};

export const waitMessageToHide = () => {
	waitElementToHide(EditEmployeePage.toastrMessageCss);
};
