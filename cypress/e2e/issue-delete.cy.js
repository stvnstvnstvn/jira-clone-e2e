describe('Issue Deletion', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url()
            .should('eq', `${Cypress.env('baseUrl')}project`)
            .then((url) => {
                cy.visit(url + '/board');
                // Click the issue to open the details modal
                cy.contains('This is an issue of type: Task.').click();
                // Assert the visibility of the issue detail view modal
                cy.get('[data-testid="modal:issue-details"]').should('be.visible');
            });
    });

    it('should delete an issue successfully', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            // Click the delete button inside the modal
            cy.get('[data-testid="icon:trash"]').click();
        });

        // Confirm the deletion
        cy.get('.dIxFno > .sc-bxivhb').should('be.visible').click();

        // Assert that the deletion confirmation dialogue is not visible
        cy.get('[data-testid="modal:confirm-delete"]').should('not.exist');

        // Assert that the issue is deleted and no longer displayed on the Jira board
        cy.get('.sc-kaNhvL').should('not.contain', 'This is an issue of type: Task.');
    });
});

describe('Issue Deletion Cancellation', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url()
            .should('eq', `${Cypress.env('baseUrl')}project`)
            .then((url) => {
                cy.visit(url + '/board');
                // Click the issue to open the details modal
                cy.contains('This is an issue of type: Task.').click();
                // Assert the visibility of the issue detail view modal
                cy.get('[data-testid="modal:issue-details"]').should('be.visible');
            });
    });

    it('should delete an issue successfully', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            // Click the delete button inside the modal
            cy.get('[data-testid="icon:trash"]').click();
        });

        // Confirm the deletion
        cy.get('.dIxFno > .sc-bxivhb').should('be.visible').click();

        // Assert that the deletion confirmation dialogue is not visible
        cy.get('[data-testid="modal:confirm-delete"]').should('not.exist');

        // Assert that the issue is deleted and no longer displayed on the Jira board
        cy.get('.sc-kaNhvL').should('not.contain', 'This is an issue of type: Task.');
    });

    it('should cancel issue deletion', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            // Click the delete button inside the modal
            cy.get('[data-testid="icon:trash"]').click();
        });

        // Cancel the deletion
        cy.get('.sc-kgoBCf > .ewzfNn > .sc-bxivhb').should('be.visible').click();

        // Assert that the deletion confirmation dialogue is not visible
        cy.get('[data-testid="modal:confirm-delete"]').should('not.exist');
    });
});
