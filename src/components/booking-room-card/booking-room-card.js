import Calendar from '../calendar/calendar.js';
import Dropdown from '../dropdown/dropdown.js';

class BookingRoomCard {
  constructor(card) {
    this.card = card;
    this.init();
  }

  init() {
    this.searchDateDropdown();
    this.searchDropdowns();
  }

  searchDateDropdown() {
    const dateDropdown = this.card.querySelector('.js-date-dropdown');
    const numOfInputs = 2;
    new Calendar(dateDropdown, numOfInputs);
  }

  searchDropdowns() {
    const dropdowns = this.card.querySelectorAll('.js-dropdown');

    dropdowns.forEach((item) => {
      new Dropdown(item);
    });
  }
}

export default BookingRoomCard;
