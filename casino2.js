async function setup() {
    
    const customerId = "test-customer";
    const currency = "USD";
    
    const response = await fetch("/api/create-deposit-request/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ customerId, currency }),
    });
    
    const data = await response.json();

    const mountElement = document.querySelector('#deposit');

    const token = data.token;

    if (window.RebillyCashier) {

        RebillyCashier.renderDeposit({

            mountElement,

            token,

        });

    } else {

        console.error('RebillyCashier library not loaded');

    }

}
document.addEventListener('DOMContentLoaded', function() {
setup();
});