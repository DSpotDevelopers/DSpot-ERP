import dayjs from 'dayjs';
import {
	verifyElementIsVisible,
	clickButton,
	clickButtonByIndex,
	waitElementToHide,
	enterInputConditionally,
	clearField,
	enterInput,
	clickKeyboardBtnByKeycode,
	verifyByText,
	verifyByLength
} from '../utils/util';
import { ManageUserInvitesPage } from '../pageobjects/ManageUserInvitesPageObject';

export const manageInvitesButtonVisible = () => {
	cy.intercept('GET', '/api/user-organization*').as('waitUserOrganization');
	cy.wait('@waitUserOrganization');
	verifyElementIsVisible(ManageUserInvitesPage.manageInvitesButtonCss);
};

export const clickManageInvitesButton = () => {
	clickButton(ManageUserInvitesPage.manageInvitesButtonCss);
};

export const gridButtonVisible = () => {
	cy.intercept('GET', '/api/invite*').as('waitInvites');
	verifyElementIsVisible(ManageUserInvitesPage.gridButtonCss);
	cy.wait('@waitInvites');
};

export const clickGridButton = (index: number) => {
	clickButtonByIndex(ManageUserInvitesPage.gridButtonCss, index);
};

export const tableBodyExists = () => {
	verifyElementIsVisible(ManageUserInvitesPage.selectTableRowCss);
};

export const clickTableRow = (index: number) => {
	clickButtonByIndex(ManageUserInvitesPage.selectTableRowCss, index);
};

export const copyLinkButtonVisible = () => {
	verifyElementIsVisible(ManageUserInvitesPage.copyLinkButtonCss);
};

export const clickCopyLinkButton = () => {
	clickButton(ManageUserInvitesPage.copyLinkButtonCss);
};

export const addInviteButtonVisible = () => {
	verifyElementIsVisible(ManageUserInvitesPage.addInviteButtonCss);
};

export const clickAddInviteButton = () => {
	clickButton(ManageUserInvitesPage.addInviteButtonCss);
};

export const resendInviteButtonVisible = () => {
	verifyElementIsVisible(ManageUserInvitesPage.resendInviteButtonCss);
};

export const clickResendInviteButton = () => {
	clickButton(ManageUserInvitesPage.resendInviteButtonCss);
};

export const confirmResendInviteButtonVisible = () => {
	verifyElementIsVisible(ManageUserInvitesPage.confirmResendInviteButtonCss);
};

export const clickConfirmResendInviteButton = () => {
	clickButton(ManageUserInvitesPage.confirmResendInviteButtonCss);
};

export const deleteInviteButtonVisible = () => {
	verifyElementIsVisible(ManageUserInvitesPage.deleteInviteButtonCss);
};

export const clickDeleteInviteButton = () => {
	clickButton(ManageUserInvitesPage.deleteInviteButtonCss);
};

export const confirmDeleteInviteButtonVisible = () => {
	verifyElementIsVisible(ManageUserInvitesPage.confirmDeleteInviteButtonCss);
};

export const clickConfirmDeleteInviteButton = () => {
	clickButton(ManageUserInvitesPage.confirmDeleteInviteButtonCss);
};

export const waitMessageToHide = () => {
	waitElementToHide(ManageUserInvitesPage.toastrMessageCss);
};

export const inviteButtonVisible = () => {
	verifyElementIsVisible(ManageUserInvitesPage.inviteButtonCss);
};

export const clickInviteButton = () => {
	clickButton(ManageUserInvitesPage.inviteButtonCss);
};

export const emailInputVisible = () => {
	verifyElementIsVisible(ManageUserInvitesPage.emailInputCss);
};

export const enterEmailInputData = (data: string) => {
	enterInputConditionally(ManageUserInvitesPage.emailInputCss, data);
};

export const dateInputVisible = () => {
	verifyElementIsVisible(ManageUserInvitesPage.dateInputCss);
};

export const enterDateInputData = () => {
	clearField(ManageUserInvitesPage.dateInputCss);
	const date = dayjs().format('MMM D, YYYY');
	enterInput(ManageUserInvitesPage.dateInputCss, date);
};

export const clickKeyboardButtonByKeyCode = (keycode) => {
	clickKeyboardBtnByKeycode(keycode);
};

export const verifyInviteExist = (name: string) => {
	verifyByLength(ManageUserInvitesPage.clientsTableRow, 1);
	verifyByText(ManageUserInvitesPage.clientsTableData, name);
};

export const verifyRoleSelect = () => {
	verifyElementIsVisible(ManageUserInvitesPage.rolesInputCss);
};

export const clickOnRoleSelect = () => {
	clickButton(ManageUserInvitesPage.rolesInputCss);
};

export const verifyRolesDropdown = () => {
	verifyElementIsVisible(ManageUserInvitesPage.dropdownCss);
};

export const clickRolesDropdown = (index: number) => {
	clickButtonByIndex(ManageUserInvitesPage.dropdownCss, index);
};

export const verifyInvitationExpirationSelect = () => {
	verifyElementIsVisible(ManageUserInvitesPage.invitationExpirationSelectCss);
};

export const clickOnInvitationExpirationSelect = () => {
	clickButton(ManageUserInvitesPage.invitationExpirationSelectCss);
};

export const verifyInvitationExpirationDropdown = () => {
	verifyElementIsVisible(ManageUserInvitesPage.dropdownCss);
};

export const clickInvitationExpirationDropdown = (index: number) => {
	clickButtonByIndex(ManageUserInvitesPage.dropdownCss, index);
};

export const clickWithCorrectStatusRow = () => {
	cy.contains('tbody tr', 'INVITED').click();
};
