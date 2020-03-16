import calendar from '../../components/calendar/calendar.js';
import dropdown from '../../components/dropdown/dropdown.js';

class searchRoomCard{
  constructor() {
    this.init();
  }

  init() {
    this.searchDateDropdown();
    this.searchDropdowns();
  }

  searchDateDropdown() {
    const dateDropdown = document.querySelector('.js-date-dropdown');
    const numOfInputs = 2;
    new calendar(dateDropdown, numOfInputs);
  }
  
  searchDropdowns() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    //каждому дропдауну на странице назначем свой класс dropdown
    dropdowns.forEach(item => {
      new dropdown(item);
    });
  }
}

export default searchRoomCard;