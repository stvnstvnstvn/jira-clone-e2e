class IssueModal {
    constructor() {
      this.submitButton = 'button[type="submit"]';
      this.issueModal = '[data-testid="modal:issue-create"]';
      this.issueDetailModal = '[data-testid="modal:issue-details"]';
      this.title = 'input[name="title"]';
      this.issueType = '[data-testid="select:type"]';
      this.descriptionField = ".ql-editor";
      this.assignee = '[data-testid="select:userIds"]';
      this.backlogList = '[data-testid="board-list:backlog"]';
      this.issuesList = '[data-testid="list-issue"]';
      this.deleteButton = '[data-testid="icon:trash"]';
      this.deleteButtonName = "Delete issue";
      this.cancelDeletionButtonName = "Cancel";
      this.confirmationPopup = '[data-testid="modal:confirm"]';
      this.closeButton = '[data-testid="icon:close"]';
      this.numberField = 'input[placeholder="Number"]';
      this.timeTrackerStopwatch = '[data-testid="icon:stopwatch"]';
      this.trackingModal = '[data-testid="modal:tracking"]';
      this.buttonDone = "Done";
      this.noTimeLoggedLabel = "No time logged";
    }
  
    getFirstListIssue() {
      return cy.get(this.issuesList, { timeout: 100000 }).eq(0).should("be.visible", { timeout: 100000 }).click();
    }
  
    getTrackingModal() {
      return cy.get(this.trackingModal, { timeout: 100000 });
    }
  
    getIssueModal() {
      return cy.get(this.issueModal, { timeout: 100000 });
    }
  
    getIssueDetailModal() {
      return cy.get(this.issueDetailModal, { timeout: 100000 });
    }
  
    getConfirmationPopup() {
      return cy.get(this.confirmationPopup);
    }
  
    selectIssueType(issueType) {
      cy.get(this.issueType).click("bottomRight");
      cy.get(`[data-testid="select-option:${issueType}"]`).trigger("mouseover").trigger("click");
    }
  
    selectAssignee(assigneeName) {
      cy.get(this.assignee).click("bottomRight");
      cy.get(`[data-testid="select-option:${assigneeName}"]`).click();
    }
  
    editTitle(title) {
      cy.get(this.title).clear().type(title);
    }
  
    editDescription(description) {
      cy.get(this.descriptionField).type(description);
    }
  
    createIssue(issueDetails) {
      this.getIssueModal().within(() => {
        this.selectIssueType(issueDetails.type);
        this.editDescription(issueDetails.description);
        this.editTitle(issueDetails.title);
        this.selectAssignee(issueDetails.assignee);
        cy.get(this.submitButton).click();
      });
      cy.log("Issue created successfully");
    }
  
    addEstimation(issueDetails) {
      this.deleteLoggedTime();
      this.getIssueDetailModal().within(() => {
        cy.get(this.numberField).clear().type(issueDetails.estimatedTime);
        cy.get(this.timeTrackerStopwatch).next().contains(`${issueDetails.estimatedTime}h estimated`);
      });
      cy.log("Estimation added");
    }
  
    validateEstimationSaved(issueDetails, timeEstimated) {
      this.closeDetailModal();
      this.getFirstListIssue();
      this.getIssueDetailModal().within(() => {
        cy.get(this.numberField).should("be.visible").should("have.attr", "value", timeEstimated);
        cy.get(this.timeTrackerStopwatch).next().contains(`${timeEstimated}h estimated`);
      });
      cy.log("Estimation saved successfully");
    }
  
    validateEstimationRemoved(issueDetails) {
      this.closeDetailModal();
      this.getFirstListIssue();
      this.getIssueDetailModal().within(() => {
        cy.get(this.numberField).should("be.visible").should("have.attr", "value", issueDetails.removedEstimatedTime).should("have.attr", "placeholder", "Number");
      });
      cy.log("Estimation removed successfully");
    }
  
    updateEstimation(issueDetails) {
      this.getIssueDetailModal().within(() => {
        cy.get(this.numberField).clear().type(issueDetails.newEstimatedTime);
        cy.get(this.timeTrackerStopwatch).next().contains(`${issueDetails.newEstimatedTime}h estimated`);
      });
      cy.log("Estimation updated");
    }
  
    removeEstimation(issueDetails) {
      this.getIssueDetailModal().within(() => {
        cy.get(this.numberField).clear();
        cy.get(this.numberField).should("have.attr", "value", issueDetails.removedEstimatedTime).should("have.attr", "placeholder", "Number");
        cy.get(this.timeTrackerStopwatch).next().should("not.contain", issueDetails.newEstimatedTime);
      });
      cy.log("Estimation removed");
    }
  
    deleteLoggedTime() {
      this.getIssueDetailModal().within(() => {
        cy.get(this.timeTrackerStopwatch).click();
      });
      this.getTrackingModal().within(() => {
        cy.get(this.numberField).eq(0).clear().should("have.attr", "value", "").should("have.attr", "placeholder", "Number");
        cy.get(this.numberField).eq(1).clear().should("have.attr", "value", "").should("have.attr", "placeholder", "Number");
        cy.get("button").contains(this.buttonDone).click();
      });
      this.getTrackingModal().should("not.exist");
      this.getIssueDetailModal().within(() => {
        cy.get(this.timeTrackerStopwatch).next().should("contain", this.noTimeLoggedLabel);
      });
      cy.log("Logged time deleted");
    }
  
    logTime(issueDetails) {
      this.getIssueDetailModal().within(() => {
        cy.get(this.timeTrackerStopwatch).click();
      });
      this.getTrackingModal().within(() => {
        cy.get(this.numberField).eq(0).type(issueDetails.timeSpent).should("have.attr", "value", issueDetails.timeSpent);
        cy.get(this.numberField).eq(1).type(issueDetails.timeRemaining).should("have.attr", "value", issueDetails.timeRemaining);
        cy.get("button").contains(this.buttonDone).click();
      });
      this.getTrackingModal().should("not.exist");
      this.getIssueDetailModal().within(() => {
        cy.get(this.timeTrackerStopwatch).next().should("not.contain", this.noTimeLoggedLabel).should("contain", `${issueDetails.timeSpent}h logged`).and("contain", `${issueDetails.timeRemaining}h remaining`);
      });
      cy.log("Time logged");
    }
  
    closeDetailModal() {
      cy.get(this.closeButton).first().click();
      cy.get(this.issueDetailModal).should("not.exist");
    }
  }
  
  export default new IssueModal();
  