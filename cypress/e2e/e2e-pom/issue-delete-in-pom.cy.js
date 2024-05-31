import IssueModal from "../../pages/IssueModal";
import { faker } from '@faker-js/faker';

describe('Issue delete', () => {
  const issueTitle = 'This is an issue of type: Task.';

  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      // Open issue detail modal with the specified title
      cy.contains(issueTitle).click();
    });
  });

  it('Should delete issue successfully', () => {
    // Steps to delete issue
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    cy.contains(issueTitle).should('not.exist');
  });

  it('Should cancel deletion process successfully', () => {
    // Steps to start deletion process but cancel it
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    cy.contains(issueTitle).should('exist');
  });
});
