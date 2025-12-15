import * as loginPage from '../support/Base/pages/Login.po';
import { LoginPageData } from '../support/Base/pagedata/LoginPageData';
import * as manageUserInvitesPage from '../support/Base/pages/ManageUserInvites.po';
import * as dashboardPage from '../support/Base/pages/Dashboard.po';
import { CustomCommands } from '../support/commands';
import { faker } from '@faker-js/faker';

let email = ' ';

describe('Manage invites test', { testIsolation: false }, () => {
	before(() => {
		email = faker.internet.exampleEmail();
		CustomCommands.login(loginPage, LoginPageData, dashboardPage);
		cy.visit('/#/pages/users');
	});
	it('Should be able to add invite', () => {
		manageUserInvitesPage.manageInvitesButtonVisible();
		manageUserInvitesPage.clickManageInvitesButton();
		manageUserInvitesPage.gridButtonVisible();
		manageUserInvitesPage.clickGridButton(1);
		manageUserInvitesPage.tableBodyExists();
		manageUserInvitesPage.clickTableRow(0);
		manageUserInvitesPage.addInviteButtonVisible();
		manageUserInvitesPage.clickAddInviteButton();
		manageUserInvitesPage.emailInputVisible();
		manageUserInvitesPage.enterEmailInputData(email);
		manageUserInvitesPage.dateInputVisible();
		manageUserInvitesPage.enterDateInputData();
		manageUserInvitesPage.verifyRoleSelect();
		manageUserInvitesPage.clickOnRoleSelect();
		manageUserInvitesPage.verifyRolesDropdown();
		manageUserInvitesPage.clickRolesDropdown(2);
		manageUserInvitesPage.verifyInvitationExpirationSelect();
		manageUserInvitesPage.clickOnInvitationExpirationSelect();
		manageUserInvitesPage.verifyInvitationExpirationDropdown();
		manageUserInvitesPage.clickInvitationExpirationDropdown(0);
		manageUserInvitesPage.inviteButtonVisible();
		manageUserInvitesPage.clickInviteButton();
		manageUserInvitesPage.waitMessageToHide();
	});
	it('Should be able to resend invite', () => {
		manageUserInvitesPage.clickWithCorrectStatusRow();
		manageUserInvitesPage.resendInviteButtonVisible();
		manageUserInvitesPage.clickResendInviteButton();
		manageUserInvitesPage.confirmResendInviteButtonVisible();
		manageUserInvitesPage.clickConfirmResendInviteButton();
		manageUserInvitesPage.waitMessageToHide();
	});
	it('Should be able to copy invite', () => {
		manageUserInvitesPage.clickWithCorrectStatusRow();
		manageUserInvitesPage.copyLinkButtonVisible();
		manageUserInvitesPage.clickCopyLinkButton();
		manageUserInvitesPage.waitMessageToHide();
	});
	it('Should be able to delete invite', () => {
		manageUserInvitesPage.clickTableRow(0);
		manageUserInvitesPage.deleteInviteButtonVisible();
		manageUserInvitesPage.clickDeleteInviteButton();
		manageUserInvitesPage.confirmDeleteInviteButtonVisible();
		manageUserInvitesPage.clickConfirmDeleteInviteButton();
	});
});
