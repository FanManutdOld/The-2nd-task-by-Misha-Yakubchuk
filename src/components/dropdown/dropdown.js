/* eslint-disable no-param-reassign */
class Dropdown {
  constructor(dropdown) {
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

    this.bindHandleDropdownInputClick();
    this.bindHandleDocumentClick();
    this.bindHandleCountMinusAndCountPlusClick(this.dropdownElement); // события на кнопки + и -
    if (this.isDropdownButtons) {
      this.dropdownButtonClear = dropdown.querySelector('.js-dropdown__clear');
      this.dropdownButtonApply = dropdown.querySelector('.js-dropdown__apply');
      this.bindHandleButtonClearClick(); // событие кнопки очистить
      this.bindHandleButtonApplyClick(); // событие кнопки применить
    }
    this.printResult(); // выводим результат
  }

  bindHandleDropdownInputClick() {
    this.dropdownWrapper.addEventListener('click', this.handleDropdownInputClick.bind(this));
  }

  bindHandleDocumentClick() {
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  bindHandleCountMinusAndCountPlusClick(dropdownElement) {
    // для каждого элемента дропдауна
    dropdownElement.forEach((item, i) => {
      const params = {};
      params.dropdownCount = item.querySelector('.js-dropdown__count');
      params.dropdownMinus = item.querySelector('.js-dropdown__minus');
      params.dropdownPlus = item.querySelector('.js-dropdown__plus');
      const dropdownName = item.querySelector('.js-dropdown__name');
      const nameForms = JSON.parse(dropdownName.getAttribute('data-name-forms')); // переводим из строки в массив
      params.min = Number(params.dropdownCount.getAttribute('data-min'));
      params.max = Number(params.dropdownCount.getAttribute('data-max'));
      params.count = Number(params.dropdownCount.textContent);
      params.i = i;

      this.arrayNameForms.push(nameForms);
      this.arrayCounts.push(params.count);
      // проверяем начальное состояние кнопок
      this.checkCount(params);

      // вешаем события нажатия на минус и плюс
      params.dropdownMinus.addEventListener('click', this.handleCountMinusClick.bind(this, params));
      params.dropdownPlus.addEventListener('click', this.handleCountPlusClick.bind(this, params));
    });
  }

  bindHandleButtonClearClick() {
    this.dropdownButtonClear.addEventListener('click', this.handleButtonClearClick.bind(this));
  }

  bindHandleButtonApplyClick() {
    this.dropdownButtonApply.addEventListener('click', this.handleButtonApplyClick.bind(this));
  }

  handleDropdownInputClick() {
    this.dropdownInput.classList.toggle('dropdown__input_expanded');
    this.dropdownElements.classList.toggle('dropdown__elements_expanded');
  }

  handleDocumentClick(event) {
    if (this.dropdownInput.classList.contains('dropdown__input_expanded')) {
      // eslint-disable-next-line max-len
      const outsideDropdown = this.dropdownElements !== event.target && !this.dropdownElements.contains(event.target) && !this.dropdownWrapper.contains(event.target);
      if (outsideDropdown) {
        this.dropdownInput.classList.toggle('dropdown__input_expanded');
        this.dropdownElements.classList.toggle('dropdown__elements_expanded');
      }
    }
  }

  handleCountMinusClick(params) {
    params.count = Number(params.dropdownCount.textContent) - 1;

    params.count = this.checkCount(params); // проверяем границы значения на min max
    this.arrayCounts[params.i] = params.count; // не забываем сохранить в массив значений
    params.dropdownCount.textContent = params.count;
    this.printResult(); // обновляем результат
  }

  handleCountPlusClick(params) {
    params.count = Number(params.dropdownCount.textContent) + 1;

    params.count = this.checkCount(params); // проверяем границы значения на min max
    this.arrayCounts[params.i] = params.count; // не забываем сохранить в массив значений
    params.dropdownCount.textContent = params.count;
    this.printResult(); // обновляем результат
  }

  checkCount(params) {
    if (params.count <= params.min) {
      params.count = params.min;
      params.dropdownMinus.setAttribute('disabled', 'true');
    }
    if (params.count >= params.max) {
      params.count = params.max;
      params.dropdownPlus.setAttribute('disabled', 'true');
    }
    if (params.count > params.min) {
      params.dropdownMinus.removeAttribute('disabled');
    }
    if (params.count < params.max) {
      params.dropdownPlus.removeAttribute('disabled');
    }
    return params.count;
  }

  handleButtonClearClick() {
    this.arrayCounts = this.arrayCounts.map(() => 0);
    this.dropdownElement.forEach((item) => {
      const dropdownCount = item.querySelector('.js-dropdown__count');
      const dropdownMinus = item.querySelector('.js-dropdown__minus');
      const dropdownPlus = item.querySelector('.js-dropdown__plus');
      dropdownMinus.setAttribute('disabled', 'true');
      dropdownPlus.removeAttribute('disabled');
      dropdownCount.textContent = 0;
    });
    this.printResult(); // обновляем результат
  }

  handleButtonApplyClick() {
    this.dropdownInput.classList.toggle('dropdown__input_expanded');
    this.dropdownElements.classList.toggle('dropdown__elements_expanded');
  }

  printResult() {
    let resultString = ''; // результирующая строка
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

    // выводим результат на страницу
    this.dropdownInput.setAttribute('value', resultString.toLowerCase());
  }

  declOfNum(number, titles) { // формирование окончаний
    const cases = [2, 0, 1, 1, 1, 2];
    // eslint-disable-next-line max-len
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

    // use:
    // declOfNum(count, ['найдена', 'найдено', 'найдены']);
  }
}

export default Dropdown;
