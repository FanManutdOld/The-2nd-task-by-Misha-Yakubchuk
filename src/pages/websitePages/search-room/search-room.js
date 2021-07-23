import Header from '../../../components/header/header.js';
import FilterDate from '../../../components/filter-date/filter-date.js';
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
    const header = document.querySelector('.js-search-room__header');
    new Header(header);
  }

  searchFilterDate() {
    const filterDate = document.querySelector('.js-search-room__filter-date');
    new FilterDate(filterDate);
  }

  searchDropdowns() {
    const dropdowns = document.querySelectorAll('.js-search-room__dropdown');

    dropdowns.forEach((item) => {
      new Dropdown(item);
    });
  }

  searchRangeSliders() {
    const rangeSlider = document.querySelector('.js-search-room__range-slider');
    new RangeSlider(rangeSlider);
  }

  searchExpandableCheckboxes() {
    const checkList = document.querySelector('.js-search-room__expandable-checkbox');
    new ExpandableCheckbox(checkList);
  }

  searchRoomCards() {
    const roomCards = document.querySelectorAll('.js-search-room__room-card');
    roomCards.forEach((item) => {
      new RoomCard(item);
    });
  }
}

export default SearchRoom;
