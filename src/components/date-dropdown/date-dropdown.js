import Calendar from '../calendar/calendar.js';

class DateDropdown {
  constructor(parent) {
    const dateDropdown = parent.querySelector('.js-date-dropdown');
    this.init(dateDropdown);
  }

  init(dateDropdown) {
    const numOfInputs = 2;
    new Calendar(dateDropdown, numOfInputs);
  }
}

export default DateDropdown;
