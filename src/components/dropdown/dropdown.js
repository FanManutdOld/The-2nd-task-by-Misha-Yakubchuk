class searchDropdowns {
  constructor() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    //каждому дропдауну на странице назначем свой класс dropdown
    dropdowns.forEach(item => {
      new dropdown(item);
    })
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
      const dropdownCount = item.querySelector('.js-dropdown__count');
      const dropdownMinus = item.querySelector('.js-dropdown__minus');
      const dropdownPlus = item.querySelector('.js-dropdown__plus');
      const dropdownName = item.querySelector('.js-dropdown__name');
      const nameForms = JSON.parse(dropdownName.getAttribute('data-nameForms')); //переводим из строки в массив
      const min = Number(dropdownCount.getAttribute('data-min'));
      const max = Number(dropdownCount.getAttribute('data-max'));

      this.arrayNameForms.push(nameForms);
      this.arrayCounts.push(Number(dropdownCount.textContent));
      let clone = Object.assign({}, this.test);
      clone.kek = i;
      //проверяем начальное состояние кнопок
      this.checkCount(Number(dropdownCount.textContent), min, max, dropdownMinus, dropdownPlus);

      //вешаем события нажатия на минус и плюс
      dropdownMinus.addEventListener('click', this.countMinus.bind(this, dropdownCount, min, max, i, dropdownMinus, dropdownPlus, clone));
      dropdownPlus.addEventListener('click', this.countPlus.bind(this, dropdownCount, min, max, i, dropdownMinus, dropdownPlus));
    })
  }

  bindButtonClear() {
    this.dropdownClear.addEventListener('click', this.buttonClear.bind(this));
  }

  toggleExpandedMod() {
    this.dropdownInput.classList.toggle('dropdown__input_expanded');
    this.dropdownElements.classList.toggle('dropdown__elements_expanded');
  }

  countMinus(dropdownCount, min, max, i, dropdownMinus, dropdownPlus, clone) {
    let count = Number(dropdownCount.textContent) - 1;

    count = this.checkCount(count, min, max, dropdownMinus, dropdownPlus); //проверяем границы значения на min max
    this.arrayCounts[i] = count; //не забываем сохранить в массив значений
    dropdownCount.textContent = count; 
    this.printResult(); //обновляем результат
    console.log(clone.kek);
  }

  countPlus(dropdownCount, min, max, i, dropdownMinus, dropdownPlus) {
    let count = Number(dropdownCount.textContent) + 1;

    count = this.checkCount(count, min, max, dropdownMinus, dropdownPlus); //проверяем границы значения на min max
    this.arrayCounts[i] = count; //не забываем сохранить в массив значений
    dropdownCount.textContent = count;
    this.printResult(); //обновляем результат
  }

  checkCount(count, min, max, dropdownMinus, dropdownPlus) {
    if (count <= min) {
      count = min;
      dropdownMinus.setAttribute('disabled', 'true');
    }
    if (count >= max) {
      count = max;
      dropdownPlus.setAttribute('disabled', 'true');
    }
    if (count > min) {
      dropdownMinus.removeAttribute('disabled');
    }
    if (count < max) {
      dropdownPlus.removeAttribute('disabled');
    }
    return count;
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
    })
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
      resultString = sumCounts + ' ' + this.declOfNum(sumCounts, this.keyWords);
    }
    //если keyWords не задан, записываем результат через запятую
    else {
      for (let i = 0; i < 2; i++) {
        resultString += this.arrayCounts[i] + ' ' + this.declOfNum(this.arrayCounts[i], this.arrayNameForms[i]) + ', ';
      }
      resultString = resultString.slice(0, -2) + '...';
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