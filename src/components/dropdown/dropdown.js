class Dropdown {
  constructor(parent) {
    const dropdown = parent.querySelector('.js-dropdown');
    this.init(dropdown);
  }

  init(dropdown) {
    this.arrayNameForms = []; // массив для форм слов
    this.arrayCounts = []; // массив значений дропдауна
    this.resultDefault = dropdown.getAttribute('data-default'); // строка выводящаяся при нулевых значениях
    this.keyWords = JSON.parse(dropdown.getAttribute('data-key-words')); // формы слова выводящегося при сумме значений. Если не задан, вернёт null
    this.dropdownInput = dropdown.querySelector('.js-dropdown__input');
    this.dropdownWrapper = dropdown.querySelector('.js-dropdown__wrapper');
    this.dropdownElements = dropdown.querySelector('.js-dropdown__elements');
    this.dropdownElement = dropdown.querySelectorAll('.js-dropdown__element');
    this.isDropdownButtons = dropdown.querySelector('.js-dropdown__bottom-buttons'); // Если кнопок нет, значит вернёт null.

    this.bindHandlesClick(this.dropdownElement);
    if (this.isDropdownButtons) {
      this.dropdownButtonClear = dropdown.querySelector('.js-dropdown__clear');
      this.dropdownButtonApply = dropdown.querySelector('.js-dropdown__apply');
      this.bindHandleButtonsClick();
    }
    this.printResult();
  }

  bindHandlesClick(dropdownElement) {
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    this.dropdownWrapper.addEventListener('click', this.handleDropdownInputClick.bind(this));

    dropdownElement.forEach((item, i) => {
      const dropdownName = item.querySelector('.js-dropdown__name');
      const nameForms = JSON.parse(dropdownName.getAttribute('data-name-forms')); // переводим из строки в массив

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
      // проверяем начальное состояние кнопок
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
    this.dropdownElements.classList.toggle('dropdown__elements_expanded');
  }

  handleDocumentClick(event) {
    if (this.dropdownInput.classList.contains('dropdown__input_expanded')) {
      const outsideDropdown = this.dropdownElements !== event.target
        && !this.dropdownElements.contains(event.target)
        && !this.dropdownWrapper.contains(event.target);
      if (outsideDropdown) {
        this.dropdownInput.classList.toggle('dropdown__input_expanded');
        this.dropdownElements.classList.toggle('dropdown__elements_expanded');
      }
    }
  }

  handleCountMinusClick(params) {
    const newCount = Number(params.dropdownCount.textContent) - 1;

    const checkedCount = this.checkCount(params, newCount); // проверяем границы значения на min max
    this.arrayCounts[params.i] = checkedCount; // не забываем сохранить в массив значений
    const dropdownCount = params.dropdownCount;
    dropdownCount.textContent = checkedCount;
    this.printResult();
  }

  handleCountPlusClick(params) {
    const newCount = Number(params.dropdownCount.textContent) + 1;

    const checkedCount = this.checkCount(params, newCount); // проверяем границы значения на min max
    this.arrayCounts[params.i] = checkedCount; // не забываем сохранить в массив значений
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
    this.dropdownElement.forEach((item) => {
      const dropdownCount = item.querySelector('.js-dropdown__count');
      const dropdownMinus = item.querySelector('.js-dropdown__button-minus');
      const dropdownPlus = item.querySelector('.js-dropdown__button-plus');
      dropdownMinus.setAttribute('disabled', 'true');
      dropdownPlus.removeAttribute('disabled');
      dropdownCount.textContent = 0;
    });
    this.printResult();
  }

  handleButtonApplyClick() {
    this.dropdownInput.classList.toggle('dropdown__input_expanded');
    this.dropdownElements.classList.toggle('dropdown__elements_expanded');
  }

  printResult() {
    let resultString = '';
    const sumCounts = this.arrayCounts.reduce((sum, item) => sum + item);

    // если сумма значений 0, записываем строку по умолчанию
    if (sumCounts === 0) {
      this.dropdownInput.setAttribute('value', this.resultDefault);
      if (this.isDropdownButtons) { // если есть кнопка очистить, скрываем её
        this.dropdownButtonClear.classList.add('dropdown__clear_hidden');
      }
      return;
    } if (this.isDropdownButtons) {
      // если сумма значений не 0 и есть кнопка очистить, показываем её
      this.dropdownButtonClear.classList.remove('dropdown__clear_hidden');
    }

    // если keyWords задан, записываем результат как сумму всех значений + keyWord
    if (this.keyWords) {
      resultString = `${sumCounts} ${this.declOfNum(sumCounts, this.keyWords)}`;
    } else { // если keyWords не задан, записываем результат через запятую
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

  declOfNum(number, titles) { // формирование окончаний
    const numOfEnding = [2, 0, 1, 1, 1, 2];

    const isLastEnding = number % 100 > 4 && number % 100 < 20;
    const correctEnding = (number % 10 < 5) ? number % 10 : 5;

    return titles[isLastEnding ? 2 : numOfEnding[correctEnding]];

    // use:
    // declOfNum(count, ['найдена', 'найдено', 'найдены']);
  }
}

export default Dropdown;
