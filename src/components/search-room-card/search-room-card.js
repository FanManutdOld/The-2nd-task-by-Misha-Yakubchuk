import Dropdown from '../dropdown/dropdown.js';
import DateDropdown from '../date-dropdown/date-dropdown.js';

class SearchRoomCard {
  constructor(parent) {
    this.card = parent.querySelector('.js-search-room-card');
    this.init();
  }

  init() {
    this.searchDateDropdown();
    this.searchDropdown();
  }

  searchDateDropdown() {
    const dateDropdown = this.card.querySelector('.js-search-room-card__date-dropdown');
    new DateDropdown(dateDropdown);
  }

  searchDropdown() {
    const dropdown = this.card.querySelector('.js-search-room-card__dropdown');
    new Dropdown(dropdown);
  }
}

export default SearchRoomCard;
