import 'air-datepicker';

class Calendar {
  constructor(item, numOfInputs) {
    this.numOfInputs = numOfInputs;
    switch (numOfInputs) {
      case 1:
        this.initOneInputs(item);
        break;
      case 2:
        this.initTwoInputs(item);
        break;
        // no default
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
    this.datepickerInput = item.querySelector('.js-filter-date__input');
    this.$calendar = $(this.datepickerInput).datepicker(options).data('datepicker');
    this.calendarContent = this.$calendar.$datepicker.children('.datepicker--content');
    this.inputWrapper = item.querySelector('.js-date-dropdown__wrapper');
    this.input1 = item.querySelector('.js-filter-date__input');

    this.inputWrapper.addEventListener('click', this.handleWrapperClick.bind(this));
    const bottomButtons = this.createButtons();
    this.calendarEvents(bottomButtons);
  }

  initTwoInputs(item) {
    const options = {
      range: true,
      onSelect: this.onSelect.bind(this),
      prevHtml: '<div class="datepicker__arrow">arrow_back</div>',
      nextHtml: '<div class="datepicker__arrow">arrow_forward</div>',
      showEvent: '',
    };
    this.datepickerInput = item.querySelector('.js-date-dropdown__input-1');
    this.$calendar = $(this.datepickerInput).datepicker(options).data('datepicker');
    this.calendarContent = this.$calendar.$datepicker.children('.datepicker--content');
    this.inputWrappers = item.querySelectorAll('.js-date-dropdown__wrapper');
    this.input1 = item.querySelector('.js-date-dropdown__input-1');
    this.input2 = item.querySelector('.js-date-dropdown__input-2');

    this.inputWrappers.forEach((wrapper) => {
      wrapper.addEventListener('click', this.handleWrapperClick.bind(this));
    });
    const bottomButtons = this.createButtons();
    this.calendarEvents(bottomButtons);
  }

  createButtons() {
    const bottomButtons = document.createElement('div');
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
    $(this.datepickerInput).datepicker({
      onChangeView(view) {
        if (view !== 'days') {
          bottomButtons.classList.add('datepicker__bottom-buttons_hidden');
        } else {
          bottomButtons.classList.remove('datepicker__bottom-buttons_hidden');
        }
      },
    });
  }

  handleWrapperClick() {
    this.$calendar.show();
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
        // no default
    }
  }

  handleButtonClearClick() {
    this.$calendar.clear();
    switch (this.numOfInputs) {
      case 1:
        this.input1.value = '';
        break;
      case 2:
        this.input1.value = '';
        this.input2.value = '';
        break;
        // no default
    }
  }

  handleButtonApplyClick() {
    let arrayDates = this.$calendar.selectedDates;
    if (arrayDates.length === 2) {
      arrayDates = arrayDates.map((item) => item.toLocaleDateString());

      switch (this.numOfInputs) {
        case 1:
          // eslint-disable-next-line no-underscore-dangle
          this.input1.value = this.$calendar._prevOnSelectValue;
          break;
        case 2:
          this.input1.value = arrayDates[0];
          this.input2.value = arrayDates[1];
          break;
          // no default
      }
      this.$calendar.hide();
    }
  }
}

export default Calendar;
