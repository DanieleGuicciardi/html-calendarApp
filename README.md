# Calendar Application

This is a simple calendar application that allows users to view the current month's calendar, select a day, and add appointments to that day. The application features a clickable calendar grid, where each day is displayed with its corresponding weekday name. Users can also add and view appointments for each day.

## Features

- **Display Current Month**: The application dynamically shows the current month and its corresponding days.
- **Clickable Days**: Users can click on any day in the calendar grid to select it.
- **Appointments**: After selecting a day, users can add and view appointments associated with that day.
- **Appointment Indicators**: Days with appointments are marked with a small dot to visually indicate the presence of scheduled events.

## How it Works

1. **Current Month Display**: The `printCurrentMonth` function sets the title of the page to the name of the current month.
2. **Days of the Month**: The `createDays` function generates the calendar grid based on the number of days in the current month. It also determines the day of the week for each day and marks Sundays in red.
3. **Day Selection**: When a user clicks on a day, the `changeMeetingDaySection` function updates the meeting day section, and if there are any existing appointments, they are displayed.
4. **Appointment Management**: Users can add appointments by filling out a form. The `handleFormSubmit` function handles the form submission, adding the appointment to the selected day's list and displaying it.

## File Structure

- `index.html`: The main HTML file that structures the calendar layout and contains the form for adding appointments.
- `style.css`: Contains the styles for the calendar grid, day cells, and other UI elements.
- `script.js`: The JavaScript file responsible for generating the calendar, handling day selections, and managing appointments.

## Usage

1. Open the `index.html` file in a browser.
2. The current month's calendar will be displayed.
3. Click on any day to view or add appointments.
4. Use the form below the calendar to add new appointments for the selected day.

## Installation

No installation is required. Simply clone or download the repository and open the `index.html` file in your browser.

## Technologies Used

- **HTML**: Used for structuring the page.
- **CSS**: Used for styling the calendar and appointment elements.
- **JavaScript**: Used for dynamic content generation, event handling, and managing appointments.

## License

This project is licensed under the MIT License.

