const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const movieSelect = document.getElementById('movie');

// load the data whenload the page
populateUI();

let price = +movieSelect.value;

// Get data from localstorage and populate UI
function populateUI(){

    //convert the string into the array(opposite of JSON.stringify)
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    //if it's empty, don't do it
    if(selectedSeats !== null && selectedSeats.length > 0){
        //forEach () take two parameter because the data reteived has two parameter
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    //retreive data from the localStorage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    
    //if it exists then assigns it
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Save the index of the selected movie
function setMovieData(index){
    //no need JSON.stringify, because it's not an array
    localStorage.setItem('selectedMovieIndex', index);
}

// Update count and amount
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //get the index and save it as an array
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    //because it's an array, so need to use JSON.stringify
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //count is the number of selectedSeats
    const selectedSeatsCount = selectedSeats.length;
    
    // change the count and amount 
    count.innerText = selectedSeatsCount;
    amount.innerText = selectedSeatsCount * price;
}

// Movie select event
movieSelect.addEventListener('click', (e) => {
    price = +e.target.value;

    //selectedIndex is the property that return the index of the selected element
    setMovieData(e.target.selectedIndex);
    updateSelectedCount();
})

// Seats select event
container.addEventListener('click', (e) => {
    
    //check to see if the the click event clicks on seat class but not occupied 
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected'); //want to change it
        updateSelectedCount();
    }
})

// Update 
updateSelectedCount();