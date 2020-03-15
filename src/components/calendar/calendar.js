class calendar {
  constructor(item, numOfInputs) {
    this.numOfInputs = numOfInputs;
    switch (numOfInputs) {
      case 1:
        this.initOneInputs(item);
        break;
      case 2:
        this.initTwoInputs(item);
        break;
    }
  }

  initOneInputs(item) {
    const options = {
      range: true,
      dateFormat: 'd M',
      multipleDatesSeparator: ' - ',
      onSelect: this.onSelect.bind(this),
      prevHtml: '<div class="datepicker__arrow">arrow_back</div>',
      nextHtml: '<div class="datepicker__arrow">arrow_forward</div>',
    };
    this.datepickerHere = item.querySelector('.datepicker-here');
    this.$myCalendar = $(this.datepickerHere).datepicker(options).data('datepicker');
    this.calendarContent = this.$myCalendar.$datepicker.children('.datepicker--content');
    this.input1 = item.querySelector('.js-filter-date__input');

    const bottomButtons = this.createButtons();
    this.calendarEvents(bottomButtons);
  }

  initTwoInputs(item) {
    const options = {
      range: true,
      onSelect: this.onSelect.bind(this),
      prevHtml: '<div class="datepicker__arrow">arrow_back</div>',
      nextHtml: '<div class="datepicker__arrow">arrow_forward</div>',
    };
    this.datepickerHere = item.querySelector('.datepicker-here');
    this.$myCalendar = $(this.datepickerHere).datepicker(options).data('datepicker');
    this.calendarContent = this.$myCalendar.$datepicker.children('.datepicker--content');
    this.input1 = item.querySelector('.js-date-dropdown__input-1');
    this.input2 = item.querySelector('.js-date-dropdown__input-2');

    const bottomButtons = this.createButtons();
    this.calendarEvents(bottomButtons);
    this.input2.addEventListener('click', this.handleInput2Click.bind(this));
  }

  createButtons() {
    const bottomButtons = document.createElement('div')
    const buttonClear = document.createElement('button');
    const buttonApply = document.createElement('button');

    bottomButtons.classList.add('datepicker__bottom-buttons');
    buttonClear.classList.add('datepicker__clear');
    buttonClear.classList.add('datepicker__bottom-button');
    buttonClear.textContent = 'Очистить';
    buttonClear.addEventListener('click', this.handleButtonClearClick.bind(this));
    buttonApply.classList.add('datepicker__apply');
    buttonApply.classList.add('datepicker__bottom-button');
    buttonApply.textContent = 'Применить';
    buttonApply.addEventListener('click', this.handleButtonApplyClick.bind(this));
    bottomButtons.appendChild(buttonClear);
    bottomButtons.appendChild(buttonApply);

    this.addButtons(bottomButtons);
    return bottomButtons;
  }

  addButtons(buttons) {
    this.calendarContent.append(buttons);
  }

  calendarEvents(bottomButtons) {
    $(this.datepickerHere).datepicker({
      // Убираем кнопки применить и очистить если выбор месяца или года
      onChangeView: function (view) {
        if (view != 'days') {
          bottomButtons.classList.add('datepicker__bottom-buttons_hidden');
        }
        else {
          bottomButtons.classList.remove('datepicker__bottom-buttons_hidden');
        }
      }
    });
  }

  handleInput2Click() {
    this.$myCalendar.show();
  }

  onSelect() {
    switch (this.numOfInputs) {
      case 1:
        this.input1.value = '';
        break;
      case 2:
        this.input1.value = '';
        this.input2.value = '';
        break;
    }
  }

  handleButtonClearClick() {
    this.$myCalendar.clear();
    switch (this.numOfInputs) {
      case 1:
        this.input1.value = '';
        break;
      case 2:
        this.input1.value = '';
        this.input2.value = '';
        break;
    }
  }

  handleButtonApplyClick() {
    let arrayDates = this.$myCalendar.selectedDates;
    if (arrayDates.length === 2) {
      arrayDates = arrayDates.map(item => item.toLocaleDateString());

      switch (this.numOfInputs) {
        case 1:
          this.input1.value = this.$myCalendar._prevOnSelectValue;
          break;
        case 2:
          this.input1.value = arrayDates[0];
          this.input2.value = arrayDates[1];
          break;
      }
    }
  }
}

export default calendar;