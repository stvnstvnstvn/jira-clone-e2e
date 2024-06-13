import IssueModal from "../pages/IssueModalTime.js";
import { faker } from "@faker-js/faker";

describe("Time Estimation Functionality and Time Logging Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url({ timeout: 100000 })
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url);
        IssueModal.getFirstListIssue();
      });
  });

  const issueDetails = {
    estimatedTime: "5",
    newEstimatedTime: "8",
    removedEstimatedTime: "",
    timeSpent: "1",
    timeRemaining: "3",
  };

  it("Add, edit and remove time estimation", () => {
    IssueModal.addEstimation(issueDetails);
    IssueModal.validateEstimationSaved(issueDetails, issueDetails.estimatedTime);
    IssueModal.updateEstimation(issueDetails);
    IssueModal.validateEstimationSaved(issueDetails, issueDetails.newEstimatedTime);
    IssueModal.removeEstimation(issueDetails);
    IssueModal.validateEstimationRemoved(issueDetails);
    IssueModal.closeDetailModal();
  });

  it("Log and remove logged time", () => {
    IssueModal.deleteLoggedTime();
    IssueModal.logTime(issueDetails);
    IssueModal.closeDetailModal();
  });
});
