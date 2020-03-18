import calendar from '../../components/calendar/calendar.js';
import dropdown from '../../components/dropdown/dropdown.js';

class bookingRoomCard{
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
    new calendar(dateDropdown, numOfInputs);
  }
  
  searchDropdowns() {
    const dropdowns = this.card.querySelectorAll('.js-dropdown');

    //каждому дропдауну на странице назначем свой класс dropdown
    dropdowns.forEach(item => {
      new dropdown(item);
    });
  }
}

export default bookingRoomCard;