import Masked from '../../../components/masked/masked';
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
    this.searchMasked();
    this.searchLikeButtons();
    this.searchExpandableCheckboxes();
    this.searchDropdowns();
    this.searchDateDropdown();
    this.searchFilterDate();
    this.searchRangeSlider();
  }

  searchMasked() {
    const masked = document.querySelector('.js-masked');

    new Masked(masked);
  }

  searchLikeButtons() {
    const likeButtons = document.querySelectorAll('.js-like-button');

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

  searchRangeSlider() {
    const rangeSlider = document.querySelector('.js-range-slider');

    new RangeSlider(rangeSlider);
  }
}

export default FormElements;
