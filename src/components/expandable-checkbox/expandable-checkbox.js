class expandableCheckbox {
  constructor(checkList) {
    this.init(checkList);
  }

  init(checkList) {
    this.checkList = checkList;
    this.checkWrapper = checkList.querySelector('.js-expandable-checkbox__wrapper');
    this.checkArrow = checkList.querySelector('.js-expandable-checkbox__arrow');
    this.checkCheckboxes = checkList.querySelector('.js-expandable-checkbox__checkboxes');

    this.bindToggleExpandedMod();
  }

  bindToggleExpandedMod() {
    this.checkWrapper.addEventListener('click', this.toggleExpandedMod.bind(this));
  }

  toggleExpandedMod() {
    this.checkArrow.classList.toggle('expandable-checkbox__arrow_expanded');
    this.checkCheckboxes.classList.toggle('expandable-checkbox__checkboxes_expanded');
  }
}

export default expandableCheckbox;