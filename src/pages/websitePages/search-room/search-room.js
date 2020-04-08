import header from '../../../components/header/header.js';
import calendar from '../../../components/calendar/calendar.js';
import dropdown from '../../../components/dropdown/dropdown.js';
import rangeSlider from '../../../components/range-slider/range-slider.js';
import expandableCheckbox from '../../../components/expandable-checkbox/expandable-checkbox';


class searchRoom{
  constructor() {
    this.init();
  }

  init() {
    this.searchHeader();
    this.searchFilterDate();
    this.searchDropdowns();
    this.searchRangeSliders();
    this.searchExpandableCheckboxes();
  }

  searchHeader() {
    const headerOnPage = document.querySelector('.header');
    new header(headerOnPage);
  }
  searchFilterDate() {
    const filterDate = document.querySelector('.js-filter-date');
    const numOfInputs = 1;
    new calendar(filterDate, numOfInputs);
  }

  searchDropdowns() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    //каждому дропдауну на странице назначем свой класс dropdown
    dropdowns.forEach(item => {
      new dropdown(item);
    });
  }

  searchRangeSliders() {
    const rangeSliderOnPage = document.querySelector('.js-range-slider');
    new rangeSlider(rangeSliderOnPage);
  }

  searchExpandableCheckboxes() {
    const checkList = document.querySelector('.js-expandable-checkbox');
    new expandableCheckbox(checkList);
  }
}

export default searchRoom;