const now = new Date();
const getYear = now.getFullYear();
const getMonth = now.getMonth();
const appointments = []; // array che conterrà gli array dei singoli giorni del mese in corso
const monthNames = [
	'Gennaio',
	'Febbraio',
	'Marzo',
	'Aprile',
	'Maggio',
	'Giugno',
	'Luglio',
	'Agosto',
	'Settembre',
	'Ottobre',
	'Novembre',
	'Dicembre',
];

const dayNames = [ 
    'Domenica',
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato'
]

//Scriviamo il nome del mese nell'h1

const printCurrentMonth = () => {
    const title = document.querySelector('h1');
    const currentMonth = monthNames[getMonth];
    title.innerText = currentMonth;
}

// Calcoliamo il numero di giorni del mese per creare la griglia e anche l'array
const dayInThisMonth = () => {
    const lastDayInTheMonth = new Date(getYear, getMonth + 1, 0); // In questo momento gli sto chiedendo, ad esempio, lo 0 luglio 2024; il giorno 0 ovviamente non esiste, ed essendo il numero prima di uno, corrisponde al giorno prima, quindi al 30 giugno
    const numberOfDays = lastDayInTheMonth.getDate();
    console.log(lastDayInTheMonth);
    console.log(numberOfDays);
    return numberOfDays;
}

// Creiamo la griglia dei giorni
const createDays = (daysNumber) => {
    const calendarDiv = document.getElementById('calendar');
    for (let i = 0; i < daysNumber; i++) {
        const dayCellDiv = document.createElement('div');
        dayCellDiv.classList.add('day');
        // le celle dovranno essere cliccabili
        dayCellDiv.addEventListener('click', function() {
            unselectAllDays(); // Servirà per deselezionare l'eventuale giorno precedentemnte selezionato
            dayCellDiv.classList.add('selected');
            changeMeetingDaySection(i);
            if (appointments[i].length > 0) {
                showAppointments(i);
            } else {
                const appointmentsDiv = document.getElementById('appointments');
                appointmentsDiv.style.display = 'none';
            }
        });
        // creiamo il numero del giorno
        const cellValue = document.createElement('h3');
        const thisDate = i + 1;
        // Evidenzio il giorno corrente
        if (thisDate == now.getDate()) {
            dayCellDiv.classList.add('currentDay');
        }

        // Scrivo le domeniche in rosso
        let thisDay = new Date(now.getFullYear(), now.getMonth(), thisDate);
        if (thisDay.getDay() === 0) {
            cellValue.classList.add('sunday');
        }

        // Scrivo il nome del giorno
        let dayNumber = thisDay.getDay();
        let dayName = dayNames[dayNumber];
        cellValue.innerText = `${dayName} ${i + 1}`;
        dayCellDiv.appendChild(cellValue);
        calendarDiv.appendChild(dayCellDiv);
        
        // Popolo l'array dei singoli giorni
        appointments.push([]);
    }
    console.log(appointments);
}

window.addEventListener('load', init());

function init() {
    printCurrentMonth();
    createDays(dayInThisMonth());
}

function unselectAllDays() {
    const previousSelected = document.querySelector('.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
}

function changeMeetingDaySection(dayDate) {
    const newMeetingDay = document.getElementById('newMeetingDay');
    newMeetingDay.innerText = dayDate + 1;
    newMeetingDay.classList.add('hasDay');
}

function showAppointments(dayDate) {
    const dayAppointments = appointments[dayDate];
    const appointmentsList = document.querySelector('#appointments ul');
    appointmentsList.innerHTML = '';
    dayAppointments.forEach((appointment) => {
        const newLi = document.createElement('li');
        newLi.innerText = appointment;
        appointmentsList.appendChild(newLi);
    });
    const appointmentsDiv = document.getElementById('appointments');
    appointmentsDiv.style.display = 'block';
}

const meetingForm = document.querySelector('form');
meetingForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    const selectedDay = document.getElementById('newMeetingDay').innerText;
    const meetingTime = document.getElementById('newMeetingTime').value;
    const meetingName = document.getElementById('newMeetingName').value;
    const meetingString = `${meetingTime} - ${meetingName}`;
    const dayIndex = parseInt(selectedDay) - 1;
    appointments[dayIndex].push(meetingString);
    meetingForm.reset();
    showAppointments(dayIndex);

    // Creo il pallino che, nel giorno selezionato, indicherà la presenza di appuntamenti
    const dot = document.createElement('span');
    dot.classList.add('dot');
    const selectedCell = document.querySelector('.selected');
    if (!selectedCell.querySelector('.dot')) {
        selectedCell.appendChild(dot);
    }
}