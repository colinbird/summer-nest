const customerId = "test-customer";

document.querySelectorAll(".currency-button").forEach( (button) => {
    button.addEventListener("click", async (e) => {
        // check if button ID cad-button or usd-button to determine currency
        const currency = e.target.id === "cad-button" ? "CAD" : "USD";
        const response = await fetch("/api/deposit-request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ customerId, currency }),
        });
        const { token, depositRequestId } = await response.json();
        RebillyInstruments.destroy();
        RebillyInstruments.mount({
            apiMode: "sandbox",
            deposit: {
                depositRequestId,
            },
            jwt: token,
        });
    });
});