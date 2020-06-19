const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const movieSelect = document.getElementById('movie');

let price = +movieSelect.value;

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    amount.innerText = selectedSeatsCount * price;
}

// Movie select event
movieSelect.addEventListener('click', (e) => {
    price = +e.target.value;
    updateSelectedCount();
})

// Seats select event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})