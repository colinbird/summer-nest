const customerId = "cus_01J6HNWJ61NBF3JGA8XH76SVE2";
let authorization = null;
(async () => {
    const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ customerId }),
    });
    authorization = await response.json();

    document.getElementById("payout-request-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById("amount").value);
        requestPayout({ amount });
    });

})();
async function requestPayout({ amount }) {
    const response = await fetch("/api/payout-request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            customerId,
            amount,
            currency: "USD",
        }),
    });
    const { payoutRequest } = await response.json();
    document.getElementById("payout-request-form").style.display = "none";
    document.getElementById("rebilly-instruments").style.display = "block";
    RebillyInstruments.mount({
        apiMode: "sandbox",
        jwt: authorization.token,
        payout: {
            payoutRequestId: payoutRequest.id,
        },
    });
}