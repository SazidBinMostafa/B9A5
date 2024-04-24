const tickets = [];
let isSelected = false;
let totalFare = 0;const grandTotalText = document.getElementById('grand-total');

function couponValidation(){
    const couponButton = document.getElementById('coupon-btn');
    if(tickets.length === 4){
        couponButton.disabled = false;
    }
    else{
        couponButton.disabled = true;
    }
}
function applyCoupon(){
    let grandTotal = 0;
    const couponButton = document.getElementById('coupon-btn');
    const appliedCoupon = document.getElementById('coupon-input').value;
    if(appliedCoupon === 'NEW15'){
        const discounted = totalFare * (15/100);
        grandTotal = totalFare - discounted;
        couponButton.disabled = true;
    }
    else if(appliedCoupon === 'Couple 20'){
        const discounted = totalFare * (20/100)
        grandTotal = totalFare - discounted;
        couponButton.disabled = true;
    }
    else{
        grandTotal = totalFare;
        invalid_coupon.showModal()
    }
    grandTotalText.innerText = grandTotal;
}

function showTicketInfo(id){
    const tr = document.createElement('tr');
    tr.setAttribute('id', 'seat'+id);
    const ticketInfo = document.getElementById('ticket-info');
    for(const ticket of tickets){
        tr.innerHTML = `
        <td>${id}</td>
        <td>Business Class</td>
        <td>550</td>`
        ticketInfo.appendChild(tr);
    }
}
function calculateFare(){
    const total = document.getElementById('total-fare');
    totalFare = 0;
    for(const ticket of tickets){
        totalFare += 550;
    }
    total.innerText = totalFare;
    grandTotalText.innerText = totalFare;
    
}
function removeTicket(seatId){
    const ticketInfo = document.getElementById('ticket-info');
    const currentTicket = document.getElementById(seatId);
    ticketInfo.removeChild(currentTicket)
    console.log(ticketInfo)
}
// selectedSeat.style.backgroundColor = "#1DD100";
function selectTicket(id){
    const selectedSeat = document.getElementById(id);
    let index = tickets.indexOf(id);
    
    if(tickets.includes(id)){
        selectedSeat.style.backgroundColor = "";
        tickets.splice(index, 1);
        const ticketInfo = document.getElementById('ticket-info');

        removeTicket('seat'+id);
        calculateFare();
        couponValidation();

    }
    else if(tickets.length > 3){
        my_modal_1.showModal()
        }
    else{
        selectedSeat.style.backgroundColor = "#1DD100";
        tickets.push(id);
        showTicketInfo(id);
        calculateFare();
        couponValidation();
        
}
}