class ExpandableCheckbox {
  constructor(parent) {
    const expCheckbox = parent.querySelector('.js-expandable-checkbox');
    this.init(expCheckbox);
  }

  init(expCheckbox) {
    this.checkWrapper = expCheckbox.querySelector('.js-expandable-checkbox__wrapper');
    this.checkArrow = expCheckbox.querySelector('.js-expandable-checkbox__arrow');
    this.checkCheckboxes = expCheckbox.querySelector('.js-expandable-checkbox__checkboxes');

    this.bindHandleCheckWrapperClick();
  }

  bindHandleCheckWrapperClick() {
    this.checkWrapper.addEventListener('click', this.handleCheckWrapperClick.bind(this));
  }

  handleCheckWrapperClick() {
    this.checkArrow.classList.toggle('expandable-checkbox__arrow_expanded');
    this.checkCheckboxes.classList.toggle('expandable-checkbox__checkboxes_expanded');
  }
}

export default ExpandableCheckbox;
