import MaskedTextField from '../../../components/masked-text-field/masked-text-field';
import ExpandableCheckbox from '../../../components/expandable-checkbox/expandable-checkbox';
import LikeButton from '../../../components/like-button/like-button';
import Dropdown from '../../../components/dropdown/dropdown.js';
import DateDropdown from '../../../components/date-dropdown/date-dropdown';
import RangeSlider from '../../../components/range-slider/range-slider.js';
import Comment from '../../../components/comment/comment';

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
    this.searchComment();
  }

  searchMasked() {
    const masked = document.querySelector('.js-form-elements__masked-text-field');
    new MaskedTextField(masked);
  }

  searchLikeButtons() {
    const likeButtons = document.querySelectorAll('.js-form-elements__like-button');
    likeButtons.forEach((item) => {
      new LikeButton(item);
    });
  }

  searchExpandableCheckboxes() {
    const checkLists = document.querySelectorAll('.js-form-elements__expandable-checkbox');
    checkLists.forEach((item) => {
      new ExpandableCheckbox(item);
    });
  }

  searchDropdowns() {
    const dropdowns = document.querySelectorAll('.js-form-elements__dropdown');
    dropdowns.forEach((item) => {
      new Dropdown(item);
    });
  }

  searchDateDropdown() {
    const dateDropdown = document.querySelector('.js-form-elements__date-dropdown');
    new DateDropdown(dateDropdown, false);
  }

  searchFilterDate() {
    const filterDateDropdown = document.querySelector('.js-form-elements__filter-date-dropdown');
    new DateDropdown(filterDateDropdown, true);
  }

  searchRangeSlider() {
    const rangeSlider = document.querySelector('.js-form-elements__range-slider');
    new RangeSlider(rangeSlider);
  }

  searchComment() {
    const comment = document.querySelector('.js-form-elements__comment');
    new Comment(comment);
  }
}

export default FormElements;
