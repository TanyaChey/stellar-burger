describe("Is available", function () {
    it("App is available on localhost:3000", function () {
        cy.visit("http://localhost:3000");
    });
});

describe("Ingredients List", function () {
    beforeEach(function () {
        cy.intercept("GET", "ingredients", {
            fix: "ingredients-list",
        }).as("ingredients-list");
        cy.visit("http://localhost:3000");
        cy.wait("@ingredients-list");
    });

    it("Ingredients rendered", function () {
        cy.get("[data-test=ingredient]");
    });

    it("Ingredients modal open", function () {
        cy.get("[data-test=ingredient]").first().click();
    });

    it("Ingredients modal have details", function () {
        cy.get("[data-test=ingredient]").first().click();
        cy.get("[data-test=title]").contains("Краторная булка N-200i");
    });
    it("Ingredients modal close", function () {
        cy.get("[data-test=ingredient]").first().click();
        cy.get("[data-test=close-modal]").click();
    });
});

describe("Burger Constructor", function () {
    beforeEach(function () {
        // Устанавливаем токены:
        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("access-token")
        );
        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("refresh-token")
        );

        cy.intercept("GET", "ingredients", {
            fix: "ingredients-list",
        }).as("ingredients-list");
        cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", {
            fix: "user.json",
        });
        cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
            fix: "order.json",
        }).as("postOrder");

        cy.visit("http://localhost:3000");
        cy.wait("@ingredients-list");
    });

    it("Drag&Drop", function () {
        cy.get("[data-test-type=bun]").first().trigger("dragstart");
        cy.get("[data-test=constructor-bun]").first().trigger("drop");

        cy.get("[data-test-type=sauce]").first().trigger("dragstart");
        cy.get("[data-test=constructor-ingredients]").first().trigger("drop");
        cy.get("[data-test-type=main]").first().trigger("dragstart");
        cy.get("[data-test=constructor-ingredients]").first().trigger("drop");
    });

    it("Ordering a burger", function () {
        cy.get("[data-test-type=bun]").first().trigger("dragstart");
        cy.get("[data-test=constructor-bun]").first().trigger("drop");

        cy.get("[data-test-type=sauce]").first().trigger("dragstart");
        cy.get("[data-test=constructor-ingredients]").first().trigger("drop");
        cy.get("[data-test-type=main]").first().trigger("dragstart");
        cy.get("[data-test=constructor-ingredients]").first().trigger("drop");
        cy.get("[data-test=order-btn]").click();
        cy.get("[data-test=close-modal]").click();
    });
});