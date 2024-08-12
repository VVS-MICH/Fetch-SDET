describe("Find Fake Bar", () => {
  it("can successfully find the fake bar ", () => {
    cy.visit("/");

    // Getting the list of bars and their identifying text
    cy.getBars().then(($elements) => {
      let availableBars = [];
      $elements.each((index, element) => {
        availableBars.push(Cypress.$(element).text()); // Collect the texts into an array to get the list of bars
      });

      let fakeBar = null;

      function splitArrayAndWeigh() {
        // Calculate the midpoint
        let midpoint = Math.floor(availableBars.length / 2);

        // dividing the array into two equal partsand accounting for possible remainders 
        let left = availableBars.slice(0, midpoint);
        let right = availableBars.slice(midpoint, midpoint * 2);
        let remainder = availableBars[midpoint * 2]; //getting the remainder if any as a single item from the remaining array

        // Enter the values into the board
        left.forEach((number, index) => {
          cy.enterLeft(number, index); // Input into left side following their indices
        });

        right.forEach((number, index) => {
          cy.enterRight(number, index); // Input into right side following their indices
        });

        cy.weigh(); //click on the weigh button

        // get the results after weighing
        processFakeBar(left, right, remainder);
      }

      function processFakeBar(left, right, remainder) {
        cy.getResults().then((text) => {
          if (left.length === 1 && text === "<") {
            cy.log("Fake bar is in left:", left[0]);
            fakeBar = left[0]; //if the fake bar is the last one left on the left
            cy.choseFakeBar(fakeBar); // Selecting the fake bar from the list
            return; // end because we have successfully identified the fake bar
          }

          if (right.length === 1 && text === ">") {
            cy.log("Fake bar is in right:", right[0]);
            fakeBar = right[0]; // if the fake bar is the last one left on the right
            cy.choseFakeBar(fakeBar); // Selecting the fake bar from the list
            return; // end because we have successfully identified the fake bar
          }

          if (text === ">") {
            cy.log("Fake bar is in right");
            availableBars = right; // taking the right side because its lighter
          } else if (text === "<") {
            cy.log("Fake bar is in left");
            availableBars = left; // taking the left side because its lighter
          } else if (text === "=") {
            cy.log("Remainder is fake bar");
            fakeBar = remainder; // the fake bar is the unweighed one(remainder)
            cy.log("Fake Bar:", fakeBar);
            cy.choseFakeBar(fakeBar); // Selecting the fake bar from the list
            return; // end because we have successfully identified the fake bar 
          }

          if (availableBars.length > 1) {
            cy.resetBoards(); // Resetting the boards
            splitArrayAndWeigh(); // Starting the weighing process by splitting the array and weighing
          }
        });
      }

      // Starting the weighing process by splitting the array and weighing
      splitArrayAndWeigh();
    });
    // Listening for the js alert and verifying that the message confirms success
    cy.on("window:alert", (text) => {
      cy.log(text) //outputting the alert text
      expect(text).to.equal("Yay! You find it!");
    });
    cy.get(".game-info > ol").children().then(($elements) => {
      const length = $elements.length;
      cy.log("Number of Weighings: ", length);
    });
    //outputting the number of weighings 
    
    cy.get(".game-info > ol").children().then(($elements) => {
      const elementTexts = [];
    
      $elements.each((index, $el) => {
        elementTexts.push($el.innerText);
      });
    
      cy.log("Weighings made:", elementTexts);
    });
    
    //outputting the list weighings made 

  });
});
