class dropdown {
  constructor(dropdown) {
    this.init(dropdown);
  }

  init(dropdown) {
    this.arrayWords = [];
    this.arrayCounts = [];
    this.resultDefault = dropdown.getAttribute('data-default');
    this.dropdownInput = dropdown.querySelector('.js-dropdown__input');
    const dropdownWrapper = dropdown.querySelector('.js-dropdown__wrapper');
    this.dropdownElements = dropdown.querySelector('.js-dropdown__elements');
    this.dropdownClear = dropdown.querySelector('.js-dropdown__clear');  //Если кнопки clear нет, значит вернёт null.
    this.dropdownElement = dropdown.querySelectorAll('.js-dropdown__element');

    //вешаем событиe сворачивания/разворачивания дропдауна по клику
    dropdownWrapper.addEventListener('click', this.toggleExpandedMod.bind(this));

    //для каждого элемента дропдауна
    this.dropdownElement.forEach((item, i) => {
      const dropdownCount = item.querySelector('.js-dropdown__count');
      const dropdownMinus = item.querySelector('.js-dropdown__minus');
      const dropdownPlus = item.querySelector('.js-dropdown__plus');
      const dropdownName = item.querySelector('.js-dropdown__name');
      this.arrayWords.push(dropdownName.textContent);
      this.arrayCounts.push(Number(dropdownCount.textContent));
      const min = Number(dropdownCount.getAttribute('data-min'));
      const max = Number(dropdownCount.getAttribute('data-max'));

      //проверяем начальное состояние кнопок
      this.checkCount(Number(dropdownCount.textContent), min, max, dropdownMinus, dropdownPlus);

      //вешаем события нажатия на минус и плюс
      dropdownMinus.addEventListener('click', this.countMinus.bind(this, dropdownCount, min, max, i, dropdownMinus, dropdownPlus));
      dropdownPlus.addEventListener('click', this.countPlus.bind(this, dropdownCount, min, max, i, dropdownMinus, dropdownPlus));
    })

    if(this.dropdownClear) {
      this.dropdownClear.addEventListener('click', this.clear.bind(this));
    }
    this.printResult();
  }

  toggleExpandedMod() {
    this.dropdownInput.classList.toggle('dropdown__input_expanded');
    this.dropdownElements.classList.toggle('dropdown__elements_expanded');
  }

  countMinus(dropdownCount, min, max, i, dropdownMinus, dropdownPlus) {
    let count = Number(dropdownCount.textContent) - 1;

    count = this.checkCount(count, min, max, dropdownMinus, dropdownPlus);
    this.arrayCounts[i] = count;
    dropdownCount.textContent = count;
    this.printResult();
  }

  countPlus(dropdownCount, min, max, i, dropdownMinus, dropdownPlus) {
    let count = Number(dropdownCount.textContent) + 1;

    count = this.checkCount(count, min, max, dropdownMinus, dropdownPlus);
    this.arrayCounts[i] = count;
    dropdownCount.textContent = count;
    this.printResult();
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

  clear() {
    this.arrayCounts = this.arrayCounts.map(item => 0);
    this.dropdownElement.forEach(item => {
      const dropdownCount = item.querySelector('.js-dropdown__count');
      const dropdownMinus = item.querySelector('.js-dropdown__minus');
      const dropdownPlus = item.querySelector('.js-dropdown__plus');
      dropdownMinus.setAttribute('disabled', 'true');
      dropdownPlus.removeAttribute('disabled');
      dropdownCount.textContent = 0;
    })
    this.printResult();
  }

  printResult() {
    let resultString = '';
    let sumCounts = this.arrayCounts.reduce((sum, item) => sum + item);
    if (sumCounts == 0) {
      this.dropdownInput.setAttribute('value', this.resultDefault);
      if (this.dropdownClear) {
        this.dropdownClear.classList.add('dropdown__clear_hidden');
      }
      return;
    }
    else if(this.dropdownClear) {
      this.dropdownClear.classList.remove('dropdown__clear_hidden');
    }
    for (let i = 0; i < this.arrayWords.length; i++) {
      resultString += this.arrayCounts[i] + ' ' + this.arrayWords[i] + ', ';
    }
    this.dropdownInput.setAttribute('value', resultString.toLowerCase());
  }
}

export default dropdown;