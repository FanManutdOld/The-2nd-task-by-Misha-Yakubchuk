import Calendar from '../calendar/calendar.js';
import Dropdown from '../dropdown/dropdown.js';

class SearchRoomCard {
  constructor(card) {
    this.card = card;
    this.init();
  }

  init() {
    this.searchDateDropdown();
    this.searchDropdown();
  }

  searchDateDropdown() {
    const dateDropdown = this.card.querySelector('.js-date-dropdown');
    const numOfInputs = 2;
    new Calendar(dateDropdown, numOfInputs);
  }

  searchDropdown() {
    const dropdown = this.card.querySelector('.js-dropdown');
    new Dropdown(dropdown);
  }
}

export default SearchRoomCard;
