class checkboxList {
  constructor() {
    this.init();
  }

  init() {
    const checkLists = document.querySelectorAll('.js-checkbox-list');
    
    checkLists.forEach(item => {
      this.bindEventListeners(item);
    })
  }

  bindEventListeners(checkList) {
    const checkWrapper = checkList.querySelector('.js-checkbox-list__wrapper');
    const checkArrow = checkList.querySelector('.js-checkbox-list__arrow');
    const checkCheckboxes = checkList.querySelector('.js-checkbox-list__checkboxes');

    checkWrapper.addEventListener('click', this.toggleExpandedMod.bind(null, checkArrow, checkCheckboxes));
  }

  toggleExpandedMod(checkArrow, checkCheckboxes) {
    checkArrow.classList.toggle('checkbox-list__arrow_expanded');
    checkCheckboxes.classList.toggle('checkbox-list__checkboxes_expanded');
  }
}

export default checkboxList;