const issueTitle = "This is an issue of type: Task.";
const confirmTitle = "Are you sure you want to delete this issue?";
const confirmMessage = "Once you delete, it's gone for good.";
const confirmWindow = '[data-testid="modal:confirm"]';
const trashButton = '[data-testid="icon:trash"]';
const deleteButton = '[data-testid="modal:confirm"] button:contains("Delete issue")';
const cancelButton = '[data-testid="modal:confirm"] button:contains("Cancel")';
const issueDetailView = '[data-testid="modal:issue-details"]';
const issueList = '[data-testid="list-issue"]';
const closeButton = '.sc-bdVaJa.fuyACr';

function assertConfirmationModal() {
  cy.get(confirmWindow)
    .should("be.visible")
    .and("contain", confirmTitle)
    .and("contain", confirmMessage);
}
function clickButton(button) {
  cy.get(button).click();
}
function checkIssueVisibility(shouldExist) {
  cy.get(issueList).should("be.visible");
  cy.reload();

  if (shouldExist) {
    cy.contains(issueTitle).should("be.visible");
  } else {
    cy.contains(issueTitle).should("not.exist");
  }
}

// ASSIGNMENT 3
describe("Issue Deletion", () => {
  beforeEach(() => {
    cy.visit("/project/board");
    cy.contains(issueTitle).click();
    cy.get(issueDetailView).should("be.visible");
    cy.get('[placeholder="Short summary"]').should("have.text", issueTitle);
  });

  it("Should delete an issue successfully", () => {
    cy.get(trashButton).click();
    assertConfirmationModal();
    clickButton(deleteButton);
    cy.get(confirmWindow).should("not.exist");
    checkIssueVisibility(false);
  });

  it("Creating issue deletion process and then canceling it", () => {
    cy.get(trashButton).click();
    assertConfirmationModal();
    clickButton(cancelButton);
    cy.get(confirmWindow).should("not.exist");
    cy.get(closeButton).click();
    checkIssueVisibility(true);
  });
});
