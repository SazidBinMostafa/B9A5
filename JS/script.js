let tickets = [];
let isSelected = false;
let totalFare = 0;
let seatCount = 40;
const grandTotalText = document.getElementById('grand-total');

function buyTicketSection(){
    document.getElementById('buy-ticket-section').scrollIntoView({behavior: "smooth"});
}

function couponValidation() {
    const couponButton = document.getElementById('coupon-btn');
    if (tickets.length === 4) {
        couponButton.disabled = false;
    }
    else {
        couponButton.disabled = true;
    }
}
function applyCoupon() {
    let grandTotal = 0;
    const couponButton = document.getElementById('coupon-btn');
    const appliedCoupon = document.getElementById('coupon-input').value;
    if (appliedCoupon === 'NEW15') {
        const discounted = totalFare * (15 / 100);
        grandTotal = totalFare - discounted;
        couponButton.disabled = true;
    }
    else if (appliedCoupon === 'Couple 20') {
        const discounted = totalFare * (20 / 100)
        grandTotal = totalFare - discounted;
        couponButton.disabled = true;
    }
    else {
        grandTotal = totalFare;
        invalid_coupon.showModal()
    }
    grandTotalText.innerText = grandTotal;
}

function showTicketInfo(id) {
    const tr = document.createElement('tr');
    tr.setAttribute('id', 'seat' + id);
    const ticketInfo = document.getElementById('ticket-info');
    for (const ticket of tickets) {
        tr.innerHTML = `
        <td>${id}</td>
        <td>Business</td>
        <td>550</td>`
        ticketInfo.appendChild(tr);
    }
}
function calculateFare() {
    const total = document.getElementById('total-fare');
    totalFare = 0;
    for (const ticket of tickets) {
        totalFare += 550;
    }
    total.innerText = totalFare;
    grandTotalText.innerText = totalFare;

}
function removeTicket(seatId) {
    const ticketInfo = document.getElementById('ticket-info');
    const currentTicket = document.getElementById(seatId);
    ticketInfo.removeChild(currentTicket)
    console.log(ticketInfo)
}


// Select Ticket \\
function selectTicket(id) {
    const selectedSeat = document.getElementById(id);
    const ticketCountText = document.getElementById('ticket-count');
    const ticketCount = parseInt(ticketCountText);
    let index = tickets.indexOf(id);

    if (tickets.includes(id)) {
        selectedSeat.style.backgroundColor = "";
        tickets.splice(index, 1);
        const ticketInfo = document.getElementById('ticket-info');

        removeTicket('seat' + id);
        ticketCountText.innerText = seatCount + 1;
        seatCount ++;
        calculateFare();
        couponValidation();

    }
    else if (tickets.length > 3) {
        my_modal_1.showModal()
    }
    else {
        selectedSeat.style.backgroundColor = "#1DD100";
        tickets.push(id);
        ticketCountText.innerText = seatCount    - 1;
        seatCount --;
        showTicketInfo(id);
        calculateFare();
        couponValidation();

    }
    onKeyUp()
}

function onKeyUp() {
    const name = document.getElementById('inputName').value;
    const number = document.getElementById('inputNumber').value;
    const nextButton = document.getElementById('countinue-purchase-btn');
    if (tickets.length > 0) {

        if (name.length > 0 && number.length === 11) {
            nextButton.disabled = false;
        }
        else {
            nextButton.disabled = true;
        }
    }
    else {
        nextButton.disabled = true;
    }

}

function continueSucess() {
    const ticketInfo = document.getElementById('ticket-info');
    const name = document.getElementById('inputName');
    const number = document.getElementById('inputNumber');
    const email = document.getElementById('inputEmail');
    const totalFareText = document.getElementById('total-fare');
    const couponInput = document.getElementById('coupon-input');
    const ticketCountText = document.getElementById('ticket-count');

    ticketInfo.innerHTML = '';
    name.value = '';
    number.value = '';
    email.value = '';
    ticketCountText.innerText = 40;
    seatCount = 40;

    for (const ticket of tickets) {
        const selectedSeat = document.getElementById(ticket);
        selectedSeat.style.backgroundColor = "";
    }

    couponInput.value = '';
    tickets = [];
    totalFareText.innerText = 0;
    grandTotalText.innerText = 0;
}