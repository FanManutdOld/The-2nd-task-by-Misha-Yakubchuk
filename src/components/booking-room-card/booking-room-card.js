import Dropdown from '../dropdown/dropdown.js';
import DateDropdown from '../date-dropdown/date-dropdown.js';

class BookingRoomCard {
  constructor(parent) {
    this.card = parent.querySelector('.js-booking-room-card');
    this.init();
  }

  init() {
    this.searchDateDropdown();
    this.searchDropdown();
  }

  searchDateDropdown() {
    const dateDropdown = this.card.querySelector('.js-booking-room-card__date-dropdown');
    new DateDropdown(dateDropdown, 'normal');
  }

  searchDropdown() {
    const dropdown = this.card.querySelector('.js-booking-room-card__dropdown');
    new Dropdown(dropdown);
  }
}

export default BookingRoomCard;
