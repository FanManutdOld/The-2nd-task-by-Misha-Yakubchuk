import Header from '../../../components/header/header.js';
import Calendar from '../../../components/calendar/calendar.js';
import Dropdown from '../../../components/dropdown/dropdown.js';
import RangeSlider from '../../../components/range-slider/range-slider.js';
import ExpandableCheckbox from '../../../components/expandable-checkbox/expandable-checkbox';
import RoomCard from '../../../components/room-card/room-card';

class SearchRoom {
  constructor() {
    this.init();
  }

  init() {
    this.searchHeader();
    this.searchFilterDate();
    this.searchDropdowns();
    this.searchRangeSliders();
    this.searchExpandableCheckboxes();
    this.searchRoomCards();
  }

  searchHeader() {
    const header = document.querySelector('.header');
    new Header(header);
  }

  searchFilterDate() {
    const filterDate = document.querySelector('.js-filter-date');
    const numOfInputs = 1;
    new Calendar(filterDate, numOfInputs);
  }

  searchDropdowns() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    dropdowns.forEach((item) => {
      new Dropdown(item);
    });
  }

  searchRangeSliders() {
    const rangeSlider = document.querySelector('.js-range-slider');
    new RangeSlider(rangeSlider);
  }

  searchExpandableCheckboxes() {
    const checkList = document.querySelector('.js-expandable-checkbox');
    new ExpandableCheckbox(checkList);
  }

  searchRoomCards() {
    const roomCards = document.querySelectorAll('.js-room-card');
    roomCards.forEach((item) => {
      new RoomCard(item);
    });
  }
}

export default SearchRoom;
