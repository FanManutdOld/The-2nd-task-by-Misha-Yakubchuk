import expandableCheckbox from '../../../components/expandable-checkbox/expandable-checkbox';
import likeButton from '../../../components/like-button/like-button';
import dropdown from '../../../components/dropdown/dropdown.js'
import calendar from '../../../components/calendar/calendar.js';

class formElements {
  constructor() {
    this.init();
  }

  init() {
    this.searchLikeButtons();
    this.searchExpandableCheckboxes();
    this.searchDropdowns();
    this.searchDateDropdown();
    console.log('hello from form-elements');
  }

  searchLikeButtons() {
    const likeButtons = document.querySelectorAll('.js-like-button');
    
    //для каждой кнопки на странице
    likeButtons.forEach(item => {
      new likeButton(item);
    });
  }

  searchExpandableCheckboxes() {
    const checkLists = document.querySelectorAll('.js-expandable-checkbox');
    
    checkLists.forEach(item => {
      new expandableCheckbox(item);
    });
  }

  searchDropdowns() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    //каждому дропдауну на странице назначем свой класс dropdown
    dropdowns.forEach(item => {
      new dropdown(item);
    });
  }

  searchDateDropdown() {
    const dateDropdown = document.querySelector('.date-dropdown');
    new calendar(dateDropdown);
  }
}

export default formElements;