const now = new Date();
const getYear = now.getFullYear();
const getMonth = now.getMonth();
const meetingForm = document.querySelector('form');
const appointments = [];

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

document.addEventListener('load', init());

function init() {
	printCurrentMonth();
	dayInThisMonth();
	createDays(dayInThisMonth());
	console.log(appointments);
	// Per mostrare gli appuntamenti del giorno in corso al caricamento della pagina. Attualmente non funzionante perché la memorizzazione dell'array non è permamente
	const nowDate = now.getDate();
	if (appointments[nowDate].length > 0) {
		showAppointments(nowDate); // Mostra eventuali appuntamenti già inseriti per quel giorno
	} else {
		const appointmentsDiv = document.getElementById('appointments');
		appointmentsDiv.style.display = 'none'; // Nascondi il div appuntamenti se per il giorno corrente non ci sono appuntamenti
	}
}

// Nome del mese
function printCurrentMonth() {
	const title = document.querySelector('h1');
	const currentMonth = monthNames[getMonth];
	title.innerText = currentMonth;
}

// Calcolo numero di giorni per griglia e array
function dayInThisMonth() {
	const lastDayInTheMonth = new Date(getYear, getMonth + 1, 0); // Il giorno 0 del mese successivo non esiste, quindi è l'ultimo giorno del mese in corso (es. lo 0 dicembre 2024 equivale al 30 novembre 2024)
	const numberOfDays = lastDayInTheMonth.getDate();
	return numberOfDays;
}

function createDays(daysNumber) {
	const calendarDiv = document.getElementById('calendar');
	for (let i = 0; i < daysNumber; i++) {
		appointments.push([]); // Popolo l'array degli appuntamenti con un numero di array vuoti corrispondenti al numero dei giorni del mese
		// Creazione griglia
		// div dei giorni
		const dayCellDiv = document.createElement('div');
		dayCellDiv.classList.add('day');
		// le celle dovranno essere cliccabili
		dayCellDiv.addEventListener('click', function () {
			unselectAllDays(); // Servirà per deselezionare un giorno eventualmente selezionato
			dayCellDiv.classList.add('selected');
			changeMeetingSection(i); // Modifica il form per prepararlo a inserire nuovi appuntamenti per quel giorno
			if (appointments[i].length > 0) {
				showAppointments(i); // Mostra eventuali appuntamenti già inseriti per quel giorno
			} else {
				const appointmentsDiv = document.getElementById('appointments');
				appointmentsDiv.style.display = 'none'; // Nascondi il div appuntamenti
			}
		});

		//numero del giorno
		const cellValue = document.createElement('h3');
		const thisDate = i + 1;
		if (thisDate == now.getDate()) {
			dayCellDiv.classList.add('currentDay');
		}

		// domeniche in rosso
		let thisDay = new Date(now.getFullYear(), now.getMonth(), thisDate);
		if (thisDay.getDay() === 0) {
			cellValue.classList.add('sunday');
		}

		// nome del giorno
		let dayNumber = thisDay.getDay();
		let dayName = dayNames[dayNumber];
		cellValue.innerText = `${dayName} ${i + 1}`;

		// Scrittura griglia completa
		dayCellDiv.appendChild(cellValue);
		calendarDiv.appendChild(dayCellDiv);
	}
}

function unselectAllDays() {
	const previousSelected = document.querySelector('.selected');
	if (previousSelected) {
		previousSelected.classList.remove('selected');
	}
}

function changeMeetingSection(dayDate) {
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
	console.log(appointments);
}

meetingForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
	e.preventDefault();
	const selectedDay = document.getElementById('newMeetingDay').innerText;
	const meetingTime = document.getElementById('newMeetingTime').value;
	const meetingName = document.getElementById('newMeetingName').value;
	const meetingString = `${meetingTime} - ${meetingName}`;
	const dayIndex = parseInt(selectedDay) - 1; // Nell'elewmento HTML il contenuto è testuale, va trasformato in numero per intercettare l'indice dell'array corretto (ovviamente facendo -1)
	appointments[dayIndex].push(meetingString);
	meetingForm.reset();
	showAppointments(dayIndex);

	// Indicatore di appuntamenti già salvati
	const dot = document.createElement('span');
	dot.classList.add('dot');
	const selectedCell = document.querySelector('.selected');
	if (!selectedCell.querySelector('.dot')) {
		selectedCell.appendChild(dot);
	}
}   
