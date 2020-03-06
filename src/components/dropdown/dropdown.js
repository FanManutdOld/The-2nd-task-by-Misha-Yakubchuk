class dropdown {
  constructor() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    //для каждого дропдауна на странице
    dropdowns.forEach(item => {
      this.init(item);
    })
  }

  init(dropdown) {
    const dropdownInput = dropdown.querySelector('.js-dropdown__input');
    const dropdownWrapper = dropdown.querySelector('.js-dropdown__wrapper');
    const dropdownElements = dropdown.querySelector('.js-dropdown__elements');
    const dropdownElement = dropdown.querySelectorAll('.js-dropdown__element');

    //вешаем событиe сворачивания/разворачивания дропдауна по клику
    dropdownWrapper.addEventListener('click', this.toggleExpandedMod.bind(null, dropdownInput, dropdownElements));

    //для каждого элемента дропдауна
    dropdownElement.forEach(item => {
      const dropdownCount = item.querySelector('.js-dropdown__count');
      const dropdownMinus = item.querySelector('.js-dropdown__minus');
      const dropdownPlus = item.querySelector('.js-dropdown__plus');
      const min = Number(dropdownCount.getAttribute('data-min'));
      const max = Number(dropdownCount.getAttribute('data-max'));

      //проверяем начальное состояние кнопок
      this.checkCount(Number(dropdownCount.textContent), min, max, dropdownMinus, dropdownPlus);

      //вешаем события нажатия на минус и плюс
      dropdownMinus.addEventListener('click', this.countMinus.bind(this, dropdownCount, min, max, dropdownMinus, dropdownPlus));
      dropdownPlus.addEventListener('click', this.countPlus.bind(this, dropdownCount, min, max, dropdownMinus, dropdownPlus));
    })
  }

  toggleExpandedMod(dropdownInput, dropdownElements) {
    dropdownInput.classList.toggle('dropdown__input_expanded');
    dropdownElements.classList.toggle('dropdown__elements_expanded');
  }

  countMinus(dropdownCount, min, max, dropdownMinus, dropdownPlus) {
    let count = Number(dropdownCount.textContent) - 1;

    count = this.checkCount(count, min, max, dropdownMinus, dropdownPlus);
    dropdownCount.textContent = count;
  }

  countPlus(dropdownCount, min, max, dropdownMinus, dropdownPlus) {
    let count = Number(dropdownCount.textContent) + 1;

    count = this.checkCount(count, min, max, dropdownMinus, dropdownPlus);
    dropdownCount.textContent = count;
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
}

export default dropdown;