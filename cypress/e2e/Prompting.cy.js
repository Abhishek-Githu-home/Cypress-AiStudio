// cy.prompt() powerful AI feature verification

describe("Prompting the feature", () => {
    it("Verify the prompting feature with flipkart website", () => {
        cy.prompt([
            "visit the automation website i.e 'https://rahulshettyacademy.com/AutomationPractice/'",
            "click the radio 1 button",
            "Type 'INDIA' in suggestion country and select INDIA",
            "Select option3 from the dropdown example",
            "tick the checkbox of option2 and option1",
            "assert the header",
            "verify the visibility of 'free access of intreview ---' text"
    
        ])
    })
})

