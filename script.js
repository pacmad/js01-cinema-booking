const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const movieSelect = document.getElementById('movie');

populateUI();

let price = +movieSelect.value;

// Get data from localstorage and populate UI
function populateUI(){

    //convert the string into the array(opposite of JSON.stringify)
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }


    
}

// Save selected movie index and price
function setMovieData(index, price){
    //no need JSON.stringify, because it's not an array
    localStorage.setItem('selectedMovieIndex', index);
    localStorage.setItem('selextedMoviePrice', price);
}

// Update count and amount
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //get the index and save it as an array
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    //because it's an array, so need to use JSON.stringify
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));



    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    amount.innerText = selectedSeatsCount * price;
}

// Movie select event
movieSelect.addEventListener('click', (e) => {
    price = +e.target.value;
    setMovieData(e.target.selectedIndex, price);
    updateSelectedCount();
})

// Seats select event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

updateSelectedCount();