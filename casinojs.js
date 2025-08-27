const customerId = "test-customer";

document.querySelectorAll(".currency-button").forEach( (button) => {
    button.addEventListener("click", async (e) => {
        // check if button ID cad-button or usd-button to determine currency
        const currency = e.target.id === "cad-button" ? "CAD" : "USD";
        const response = await fetch("/api/create-cashier", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ customerId, currency }),
        });
        const { cashierToken } = await response.json();
        if (!cashierToken) {
            console.error("Failed to retrieve cashier token");
            return;
        }

        const mountElement = document.querySelector("#deposit");

        if (window.RebillyCashier) {
            window.RebillyCashier.renderDeposit({
                mountElement,
                cashierToken,
            });
        } else {
            console.error("RebillyCashier library not loaded");
        }
    });
});