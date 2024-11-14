const now = new Date();
const getYear = now.getFullYear();
const getMonth = now.getMonth();
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
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

document.addEventListener("load", init());

function init() {
    const appointmentDiv = document.getElementById("appointments");
    appointmentDiv.style.display = "none";  //nascondo gli appuntamenti al caricamento della pagina
    printCurrentMonth();
    dayInThismMonth();
    createDays(dayInThismMonth());
}

//Nome del mese
function printCurrentMonth() {
    const title = document.querySelector("h1");
    const currentMonth = monthNames[getMonth];
    title.innerText = currentMonth;
}

//Calcolo numero di giorni per griglia e array
function dayInThismMonth() {
    const lastDayInTheMont = new Date(getYear, getMonth + 1, 0);
    const numberOfDays = lastDayInTheMont.getDate();
    return numberOfDays;
}

function createDays(daysNumber) {
    const calendarDiv = document.getElementById("calendar");
    for(let i = 0; i < daysNumber; i++) {
        appointments.push([]);
        
        const dayCellDiv = document.createElement("div");
        dayCellDiv.classList.add("day");

        //Le celle dovranno essere cliccabili
        dayCellDiv.addEventListener("click", function() {
            unselectAllDays(); //serve a deselezionare un giorno eventualmente selezionato
            dayCellDiv.classList.add("selected");
            changeMeetingSelection(i);  //Modifica il form per inserire nuovi apuntamenti per quel giorno
            if(appointments[i].length > 0) {
                showAppointments(i);  //Mostra appuntamenti
            } else {
                const appointmentDiv = document.getElementById("appointments");
                appointmentDiv.style.display = "none";  //Nascondi il div appuntamenti
            }
        });

        //numero del giorno
        const cellValue = document.createElement("h3");
        const thisDate = i + 1;
        if(thisDate == now.getDate()) {
            dayCellDiv.classList.add("currentDay");
        }

        //domeniche in rosso
        let thisDay = new Date(now.getFullYear(), now.getMonth(), thisDate);
        if (thisDay.getDay() === 0) {
            cellValue.classList.add("sunday");
        }

        //nome del giorno
        let dayNumber = thisDay.getDay();
        let dayName = dayNames[dayNumber];
        cellValue.innerText = `${dayName} ${i + 1}`;

        //scrittura griglia completa
        dayCellDiv.appendChild(cellValue);
        calendarDiv.appendChild(dayCellDiv);
    }
}

function unselectAllDays() {
    const previousSelected = document.querySelector(".selected");
    if(previousSelected) {
        previousSelected.classList.remove("selected");

    }
}

function changeMeetingSelection(dayDate) {
    const newMeetingDay = document.getElementById("newMeetingDay");
    newMeetingDay.innerText = dayDate + 1;
    newMeetingDay.classList.add("hasDay");
}

function showAppointments(dayDate) {
    const dayAppointments = appointments[dayDate];
    const appointmentsList = document.querySelector("#appointments ul");
    appointmentsList.innerText = "";
    dayAppointments.forEach((appointment) => {
        const newLi = document.createElement("li");
        newLi.innerText = appointment;
        appointmentsList.appendChild(newLi);
    });
    const appointmentDiv = document.getElementById("appointments");
    appointmentDiv.style.display = "block";
}

meetingForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    const selectedDay = document.getElementById("newMeetingDay").innerText;
    const meetingTime = document.getElementById("newMeetingTime").value;
    const meetingName = document.getElementById("newMeetingName").value;
    const meetingString = `${meetingTime} - ${meetingName}`;
    const dayIndex = parseInt(selectedDay) - 1;
    appointments[dayIndex].push(meetingString);
    meetingForm.reset();
    showAppointments(dayIndex);
}