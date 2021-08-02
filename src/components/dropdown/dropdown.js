class Dropdown {
  constructor(parent) {
    const dropdown = parent.querySelector('.js-dropdown');
    this.init(dropdown);
  }

  init(dropdown) {
    this.arrayNameForms = [];
    this.arrayCounts = [];
    this.resultDefault = dropdown.getAttribute('data-default');
    this.keyWords = JSON.parse(dropdown.getAttribute('data-key-words'));
    this.dropdownInput = dropdown.querySelector('.js-dropdown__input');
    this.dropdownWrapper = dropdown.querySelector('.js-dropdown__wrapper');
    this.dropdownList = dropdown.querySelector('.js-dropdown__list');
    this.dropdownElements = dropdown.querySelectorAll('.js-dropdown__element');
    this.isDropdownButtons = dropdown.querySelector('.js-dropdown__bottom-buttons');

    this.bindHandlesClick();
    if (this.isDropdownButtons) {
      this.dropdownButtonClear = dropdown.querySelector('.js-dropdown__clear');
      this.dropdownButtonApply = dropdown.querySelector('.js-dropdown__apply');
      this.bindHandleButtonsClick();
    }
    this.printResult();
  }

  bindHandlesClick() {
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    this.dropdownWrapper.addEventListener('click', this.handleDropdownInputClick.bind(this));

    this.dropdownElements.forEach((item, i) => {
      const dropdownName = item.querySelector('.js-dropdown__name');
      const nameForms = JSON.parse(dropdownName.getAttribute('data-name-forms'));

      const dropdownCount = item.querySelector('.js-dropdown__count');
      const params = {
        dropdownCount,
        dropdownMinus: item.querySelector('.js-dropdown__button[data-type="minus"]'),
        dropdownPlus: item.querySelector('.js-dropdown__button[data-type="plus"]'),
        min: Number(dropdownCount.getAttribute('data-min')),
        max: Number(dropdownCount.getAttribute('data-max')),
        count: Number(dropdownCount.textContent),
        i,
      };

      this.arrayNameForms.push(nameForms);
      this.arrayCounts.push(params.count);
      this.checkCount(params, params.count);

      params.dropdownMinus.addEventListener('click', this.handleCountMinusClick.bind(this, params));
      params.dropdownPlus.addEventListener('click', this.handleCountPlusClick.bind(this, params));
    });
  }

  bindHandleButtonsClick() {
    this.dropdownButtonClear.addEventListener('click', this.handleButtonClearClick.bind(this));
    this.dropdownButtonApply.addEventListener('click', this.handleButtonApplyClick.bind(this));
  }

  handleDropdownInputClick() {
    this.dropdownInput.classList.toggle('dropdown__input_expanded');
    this.dropdownList.classList.toggle('dropdown__list_expanded');
  }

  handleDocumentClick(event) {
    if (this.dropdownInput.classList.contains('dropdown__input_expanded')) {
      const isOutsideDropdown = this.dropdownList !== event.target
        && !this.dropdownList.contains(event.target)
        && !this.dropdownWrapper.contains(event.target);
      if (isOutsideDropdown) {
        this.dropdownInput.classList.toggle('dropdown__input_expanded');
        this.dropdownList.classList.toggle('dropdown__list_expanded');
      }
    }
  }

  handleCountMinusClick(params) {
    const newCount = Number(params.dropdownCount.textContent) - 1;

    const checkedCount = this.checkCount(params, newCount);
    this.arrayCounts[params.i] = checkedCount;
    const dropdownCount = params.dropdownCount;
    dropdownCount.textContent = checkedCount;
    this.printResult();
  }

  handleCountPlusClick(params) {
    const newCount = Number(params.dropdownCount.textContent) + 1;

    const checkedCount = this.checkCount(params, newCount);
    this.arrayCounts[params.i] = checkedCount;
    const dropdownCount = params.dropdownCount;
    dropdownCount.textContent = checkedCount;
    this.printResult();
  }

  checkCount(params, newCount) {
    const {
      min, max, dropdownMinus, dropdownPlus,
    } = params;
    if (newCount <= min) {
      dropdownMinus.setAttribute('disabled', 'true');
      return min;
    } if (newCount >= max) {
      dropdownPlus.setAttribute('disabled', 'true');
      return max;
    }
    dropdownMinus.removeAttribute('disabled');
    dropdownPlus.removeAttribute('disabled');
    return newCount;
  }

  handleButtonClearClick() {
    this.arrayCounts = this.arrayCounts.map(() => 0);
    this.dropdownElements.forEach((item) => {
      const dropdownCount = item.querySelector('.js-dropdown__count');
      const dropdownMinus = item.querySelector('.js-dropdown__button[data-type="minus"]');
      const dropdownPlus = item.querySelector('.js-dropdown__button[data-type="plus"]');
      dropdownMinus.setAttribute('disabled', 'true');
      dropdownPlus.removeAttribute('disabled');
      dropdownCount.textContent = 0;
    });
    this.printResult();
  }

  handleButtonApplyClick() {
    this.dropdownInput.classList.toggle('dropdown__input_expanded');
    this.dropdownList.classList.toggle('dropdown__list_expanded');
  }

  printResult() {
    let resultString = '';
    const sumCounts = this.arrayCounts.reduce((sum, item) => sum + item);

    if (sumCounts === 0) {
      this.dropdownInput.setAttribute('value', this.resultDefault);
      if (this.isDropdownButtons) {
        this.dropdownButtonClear.classList.add('dropdown__clear_hidden');
      }
      return;
    } if (this.isDropdownButtons) {
      this.dropdownButtonClear.classList.remove('dropdown__clear_hidden');
    }

    if (this.keyWords) {
      resultString = `${sumCounts} ${this.declOfNum(sumCounts, this.keyWords)}`;
    } else {
      for (let i = 0; i < 2; i++) {
        resultString += `${this.arrayCounts[i]} ${this.declOfNum(this.arrayCounts[i], this.arrayNameForms[i])}, `;
      }
      if (this.arrayCounts.length > 2) {
        resultString = `${resultString.slice(0, -2)}...`;
      } else {
        resultString = resultString.slice(0, -2);
      }
    }

    this.dropdownInput.setAttribute('value', resultString.toLowerCase());
  }

  declOfNum(number, titles) {
    const numOfEnding = [2, 0, 1, 1, 1, 2];

    const isLastEnding = number % 100 > 4 && number % 100 < 20;
    const correctEnding = (number % 10 < 5) ? number % 10 : 5;

    return titles[isLastEnding ? 2 : numOfEnding[correctEnding]];

    // use:
    // declOfNum(count, ['найдена', 'найдено', 'найдены']);
  }
}

export default Dropdown;
