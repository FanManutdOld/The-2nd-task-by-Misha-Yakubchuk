import ExpandableCheckbox from '../../../components/expandable-checkbox/expandable-checkbox';
import LikeButton from '../../../components/like-button/like-button';
import Dropdown from '../../../components/dropdown/dropdown.js';
import Calendar from '../../../components/calendar/calendar.js';
import RangeSlider from '../../../components/range-slider/range-slider.js';

class FormElements {
  constructor() {
    this.init();
  }

  init() {
    this.searchLikeButtons();
    this.searchExpandableCheckboxes();
    this.searchDropdowns();
    this.searchDateDropdown();
    this.searchFilterDate();
    this.searchRangeSliders();
  }

  searchLikeButtons() {
    const likeButtons = document.querySelectorAll('.js-like-button');

    // для каждой кнопки на странице
    likeButtons.forEach((item) => {
      new LikeButton(item);
    });
  }

  searchExpandableCheckboxes() {
    const checkLists = document.querySelectorAll('.js-expandable-checkbox');

    checkLists.forEach((item) => {
      new ExpandableCheckbox(item);
    });
  }

  searchDropdowns() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    // каждому дропдауну на странице назначем свой класс dropdown
    dropdowns.forEach((item) => {
      new Dropdown(item);
    });
  }

  searchDateDropdown() {
    const dateDropdown = document.querySelector('.js-date-dropdown');
    const numOfInputs = 2;
    new Calendar(dateDropdown, numOfInputs);
  }

  searchFilterDate() {
    const filterDate = document.querySelector('.js-filter-date');
    const numOfInputs = 1;
    new Calendar(filterDate, numOfInputs);
  }

  searchRangeSliders() {
    const rangeSliders = document.querySelectorAll('.js-range-slider');

    rangeSliders.forEach((item) => {
      new RangeSlider(item);
    });
  }
}

export default FormElements;
