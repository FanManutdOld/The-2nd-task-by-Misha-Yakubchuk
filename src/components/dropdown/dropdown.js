class searchDropdowns {
  constructor() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    //каждому дропдауну на странице назначем свой класс dropdown
    dropdowns.forEach(item => {
      new dropdown(item);
    });
  }
}

class dropdown {
  constructor(dropdown) {
    this.init(dropdown);
  }
  init(dropdown) {
    this.arrayNameForms = [];  //массив для форм слов
    this.arrayCounts = [];  //массив значений дропдауна
    this.resultDefault = dropdown.getAttribute('data-default');  //строка выводящаяся при нулевых значениях
    this.keyWords = JSON.parse(dropdown.getAttribute('data-keyWords'));  //формы слова выводящегося при сумме значений. Если не задан, вернёт null
    this.dropdownInput = dropdown.querySelector('.js-dropdown__input');
    this.dropdownWrapper = dropdown.querySelector('.js-dropdown__wrapper');
    this.dropdownElements = dropdown.querySelector('.js-dropdown__elements');
    this.dropdownElement = dropdown.querySelectorAll('.js-dropdown__element');
    this.dropdownClear = dropdown.querySelector('.js-dropdown__clear');  //Если кнопки clear нет, значит вернёт null.

    this.bindToggleExpandedMod();  //вешаем событиe сворачивания/разворачивания дропдауна по клику
    this.bindCountMinusAndCountPlus(this.dropdownElement);  //события на кнопки + и -
    if (this.dropdownClear) {
      this.bindButtonClear();  //событие кнопки очистить
    }
    this.printResult();  //выводим результат
  }

  bindToggleExpandedMod() {
    this.dropdownWrapper.addEventListener('click', this.toggleExpandedMod.bind(this));
  }

  bindCountMinusAndCountPlus(dropdownElement) {
    //для каждого элемента дропдауна
    dropdownElement.forEach((item, i) => {
      let params = {};
      params.dropdownCount = item.querySelector('.js-dropdown__count');
      params.dropdownMinus = item.querySelector('.js-dropdown__minus');
      params.dropdownPlus = item.querySelector('.js-dropdown__plus');
      const dropdownName = item.querySelector('.js-dropdown__name');
      const nameForms = JSON.parse(dropdownName.getAttribute('data-nameForms')); //переводим из строки в массив
      params.min = Number(params.dropdownCount.getAttribute('data-min'));
      params.max = Number(params.dropdownCount.getAttribute('data-max'));
      params.count = Number(params.dropdownCount.textContent);
      params.i = i;
      
      this.arrayNameForms.push(nameForms);
      this.arrayCounts.push(params.count);
      //проверяем начальное состояние кнопок
      this.checkCount(params);

      //вешаем события нажатия на минус и плюс
      params.dropdownMinus.addEventListener('click', this.countMinus.bind(this, params));
      params.dropdownPlus.addEventListener('click', this.countPlus.bind(this, params));
    });
  }

  bindButtonClear() {
    this.dropdownClear.addEventListener('click', this.buttonClear.bind(this));
  }

  toggleExpandedMod() {
    this.dropdownInput.classList.toggle('dropdown__input_expanded');
    this.dropdownElements.classList.toggle('dropdown__elements_expanded');
  }

  countMinus(params) {
    params.count = Number(params.dropdownCount.textContent) - 1;

    params.count = this.checkCount(params); //проверяем границы значения на min max
    this.arrayCounts[params.i] = params.count; //не забываем сохранить в массив значений
    params.dropdownCount.textContent = params.count; 
    this.printResult(); //обновляем результат
  }

  countPlus(params) {
    params.count = Number(params.dropdownCount.textContent) + 1;

    params.count = this.checkCount(params); //проверяем границы значения на min max
    this.arrayCounts[params.i] = params.count; //не забываем сохранить в массив значений
    params.dropdownCount.textContent = params.count;
    this.printResult(); //обновляем результат
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

  buttonClear() {
    this.arrayCounts = this.arrayCounts.map(item => 0);
    this.dropdownElement.forEach(item => {
      const dropdownCount = item.querySelector('.js-dropdown__count');
      const dropdownMinus = item.querySelector('.js-dropdown__minus');
      const dropdownPlus = item.querySelector('.js-dropdown__plus');
      dropdownMinus.setAttribute('disabled', 'true');
      dropdownPlus.removeAttribute('disabled');
      dropdownCount.textContent = 0;
    });
    this.printResult();  //обновляем результат
  }

  printResult() {
    let resultString = ''; //результирующая строка
    let sumCounts = this.arrayCounts.reduce((sum, item) => sum + item);

    //если сумма значений 0, записываем строку по умолчанию
    if (sumCounts == 0) { 
      this.dropdownInput.setAttribute('value', this.resultDefault);
      if (this.dropdownClear) { //если есть кнопка очистить, скрываем её
        this.dropdownClear.classList.add('dropdown__clear_hidden');
      }
      return;
    }
    else if (this.dropdownClear) { //если сумма значений не 0 и есть кнопка очистить, показываем её
      this.dropdownClear.classList.remove('dropdown__clear_hidden');
    }

    //если keyWords задан, записываем результат как сумму всех значений + keyWord
    if (this.keyWords) {
      resultString = `${sumCounts} ${this.declOfNum(sumCounts, this.keyWords)}`;
    }
    //если keyWords не задан, записываем результат через запятую
    else {
      for (let i = 0; i < 2; i++) {
        resultString += `${this.arrayCounts[i]} ${this.declOfNum(this.arrayCounts[i], this.arrayNameForms[i])}, `;
      }
      resultString = `${resultString.slice(0, -2)}...`;
    }

    //выводим результат на страницу
    this.dropdownInput.setAttribute('value', resultString.toLowerCase());
  }

  declOfNum(number, titles) { //формирование окончаний
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

    //use:
    //declOfNum(count, ['найдена', 'найдено', 'найдены']);
  }
}

export default searchDropdowns;