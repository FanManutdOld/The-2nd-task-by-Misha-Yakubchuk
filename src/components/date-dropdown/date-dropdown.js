import 'air-datepicker';

class DateDropdown {
  constructor(parent, type) {
    switch (type) {
      case 'normal':
        this.initDateDropdown(parent);
        this.isFilter = false;
        break;
      case 'filter':
        this.initFilterDateDropdown(parent);
        this.isFilter = true;
        break;
      case 'inline':
        this.initInlineDateDropdown(parent);
        break;
      // no default
    }
  }

  initInlineDateDropdown(parent) {
    const dateDropdown = parent.querySelector('.js-date-dropdown');
    const options = {
      inline: true,
      prevHtml: '<div class="datepicker__arrow">arrow_back</div>',
      nextHtml: '<div class="datepicker__arrow">arrow_forward</div>',
    };
    $(dateDropdown).datepicker(options);
  }

  initFilterDateDropdown(parent) {
    this.datepickerInput = parent.querySelector('.js-date-dropdown__input');
    const options = {
      range: true,
      dateFormat: 'd M',
      multipleDatesSeparator: ' - ',
      onSelect: this.handleCalendarOnSelect.bind(this),
      prevHtml: '<div class="datepicker__arrow">arrow_back</div>',
      nextHtml: '<div class="datepicker__arrow">arrow_forward</div>',
    };
    this.$calendar = $(this.datepickerInput).datepicker(options).data('datepicker');
    this.calendarContent = this.$calendar.$datepicker.children('.datepicker--content');
    this.inputWrapper = parent.querySelector('.js-date-dropdown__wrapper');
    this.input1 = parent.querySelector('.js-date-dropdown__input');

    this.inputWrapper.addEventListener('click', this.handleWrapperClick.bind(this));
    const bottomButtons = this.createButtons();
    this.bindCalendarOnChangeView(bottomButtons);
    this.$calendar.$datepicker[0].classList.add('datepicker_size_small');
  }

  initDateDropdown(item) {
    this.input1 = item.querySelector('.js-date-dropdown__input[data-input-number="1"]');
    this.input2 = item.querySelector('.js-date-dropdown__input[data-input-number="2"]');
    const options = {
      range: true,
      onSelect: this.handleCalendarOnSelect.bind(this),
      prevHtml: '<div class="datepicker__arrow">arrow_back</div>',
      nextHtml: '<div class="datepicker__arrow">arrow_forward</div>',
      showEvent: '',
    };
    this.$calendar = $(this.input1).datepicker(options).data('datepicker');
    this.calendarContent = this.$calendar.$datepicker.children('.datepicker--content');
    this.inputWrappers = item.querySelectorAll('.js-date-dropdown__wrapper');

    this.inputWrappers.forEach((wrapper) => {
      wrapper.addEventListener('click', this.handleWrapperClick.bind(this));
    });
    const bottomButtons = this.createButtons();
    this.bindCalendarOnChangeView(bottomButtons);
  }

  createButtons() {
    const buttonClear = document.createElement('button');
    buttonClear.classList.add('datepicker__clear');
    buttonClear.classList.add('datepicker__bottom-button');
    buttonClear.textContent = 'Очистить';
    buttonClear.addEventListener('click', this.handleButtonClearClick.bind(this));

    const buttonApply = document.createElement('button');
    buttonApply.classList.add('datepicker__apply');
    buttonApply.classList.add('datepicker__bottom-button');
    buttonApply.textContent = 'Применить';
    buttonApply.addEventListener('click', this.handleButtonApplyClick.bind(this));

    const bottomButtons = document.createElement('div');
    bottomButtons.classList.add('datepicker__bottom-buttons');
    bottomButtons.appendChild(buttonClear);
    bottomButtons.appendChild(buttonApply);

    this.addButtons(bottomButtons);
    return bottomButtons;
  }

  addButtons(buttons) {
    this.calendarContent.append(buttons);
  }

  bindCalendarOnChangeView(bottomButtons) {
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

  handleCalendarOnSelect() {
    if (this.isFilter) {
      this.input1.value = '';
    } else {
      this.input1.value = '';
      this.input2.value = '';
    }
  }

  handleButtonClearClick() {
    this.$calendar.clear();
    if (this.isFilter) {
      this.input1.value = '';
    } else {
      this.input1.value = '';
      this.input2.value = '';
    }
  }

  handleButtonApplyClick() {
    let arrayDates = this.$calendar.selectedDates;
    if (arrayDates.length === 2) {
      arrayDates = arrayDates.map((item) => item.toLocaleDateString());

      if (this.isFilter) {
        // eslint-disable-next-line no-underscore-dangle
        this.input1.value = String(this.$calendar._prevOnSelectValue).toLowerCase();
      } else {
        this.input1.value = arrayDates[0];
        this.input2.value = arrayDates[1];
      }
      this.$calendar.hide();
    }
  }
}

export default DateDropdown;
