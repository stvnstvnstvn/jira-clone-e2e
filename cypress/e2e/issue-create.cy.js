import { faker } from '@faker-js/faker';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  // TEST CASE 1: Custom issue creation //
  it('Should create an issue and validate it successfully - TESTCASE1', () => {
    cy.get('[data-testid="modal:issue-create"]', { timeout: 60000 }).should('be.visible');
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type('My bug description');
      cy.get('.ql-editor').should('have.text', 'My bug description');
      cy.get('input[name="title"]').type('Bug');
      cy.get('input[name="title"]').should('have.value', 'Bug');
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').wait(1000).trigger('mouseover').trigger('click');
      cy.get('[data-testid="icon:bug"]').should('be.visible');
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]').click();
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('button[type="submit"]').click();
    });
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', 5)
          .first()
          .find('p')
          .contains('Bug')
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
            cy.get('[data-testid="icon:bug"]').should('be.visible');
          });
      });
  });

  // TEST CASE 2: Random Data Plugin Issue Creation //
  it('Should create a task issue with random data and validate it successfully - TESTCASE2', () => {
    const randomTitle = faker.random.word();
    const randomDescription = faker.random.words(5);

    cy.get('[data-testid="modal:issue-create"]', { timeout: 50000 }).should('be.visible');
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type(randomDescription);
      cy.get('.ql-editor').should('have.text', randomDescription);
      cy.get('input[name="title"]').type(randomTitle);
      cy.get('input[name="title"]').should('have.value', randomTitle);
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="icon:task"]').should('be.visible');
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').click();
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', 5)
          .first()
          .find('p')
          .contains(randomTitle)
          .siblings()
          .within(() => {
            cy.get('[data-testid="icon:task"]').should('be.visible');
          });
      });
  });
});
