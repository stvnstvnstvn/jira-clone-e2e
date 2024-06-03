describe('Issue comments creating, editing and deleting - EXAMPLE1', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });
});


describe('Issue comments creating, editing and deleting - ASSIGNMENT1', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });
  
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
  
    it('Should create, edit and delete a comment successfully', () => {
      const comment = `Test Comment - ${Math.random().toString(36).substring(5)}`;
  
      getIssueDetailsModal().within(() => {
        cy.contains('Add a comment...')
          .click();
        cy.get('textarea[placeholder="Add a comment..."]').type(comment);
        cy.contains('button', 'Save')
          .click()
          .should('not.exist');
        cy.contains('Add a comment...').should('exist');
        cy.get('[data-testid="issue-comment"]').should('contain', comment);
      });
  
      const editedComment = comment + ' (edited)';
      getIssueDetailsModal().within(() => {
        cy.get('[data-testid="issue-comment"]')
          .first()
          .contains('Edit')
          .click()
          .should('not.exist');
        cy.get('textarea[placeholder="Add a comment..."]')
          .should('contain', comment)
          .clear()
          .type(editedComment);
        cy.contains('button', 'Save')
          .click()
          .should('not.exist');
        cy.get('[data-testid="issue-comment"]')
          .should('contain', 'Edit')
          .and('contain', editedComment);
      });
  
      getIssueDetailsModal()
        .find('[data-testid="issue-comment"]')
        .each(($comment) => {
          cy.wrap($comment).contains('Delete').click();
          cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');
        });
  
      getIssueDetailsModal()
        .find('[data-testid="issue-comment"]')
        .should('not.exist');
    });
  });

  
  