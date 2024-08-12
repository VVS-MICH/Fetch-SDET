Cypress.Commands.add("enterLeft", (number, index) => {
  cy.get(".game-board")
    .eq(0)
    .find(".board-row")
    .children()
    .eq(index)
    .type(number);
});
Cypress.Commands.add("enterRight", (number, index) => {
  cy.get(".game-board")
    .eq(1)
    .find(".board-row")
    .children()
    .eq(index)
    .type(number);
});
//filling out the bowls grids with bar numbers (0 to 8)

Cypress.Commands.add("weigh", () => {
  cy.get(".button").contains("Weigh").click();
  cy.wait(2000); // Waiting for the result to be displayed
});
Cypress.Commands.add("resetBoards", () => {
  cy.get(".button").contains("Reset").click();
  cy.wait(2000); // Waiting for the board to reset
});
//clicks on buttons (“Weigh”, “Reset”)

Cypress.Commands.add("choseFakeBar", (fakeBar) => {
  cy.get(".coins").contains(fakeBar).click();
});
//Clicking on the gold bar number at the bottom of the website and checking for the alert message

Cypress.Commands.add("getBars", () => {
  cy.get(".coins").children();
}); //getting a list of bars available for weighing

Cypress.Commands.add("getResults", () => {
  cy.get(".result > #reset").invoke("text");
}); //Getting the measurement results (field between the 'bowls')
