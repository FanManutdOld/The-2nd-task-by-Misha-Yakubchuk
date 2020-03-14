class calendar {
  constructor(item) {
    this.init(item);
  }


  init(item) {
    const options = {
      range: true,
      prevHtml: '<div class="datepicker__arrow">arrow_back</div>',
      nextHtml: '<div class="datepicker__arrow">arrow_forward</div>',
    };
    this.datepickerHere = item.querySelector('.datepicker-here');
    //this.datepickerHere = $('.data-dropdown__calendar');
    this.myCalendar = $(this.datepickerHere).datepicker(options).data('datepicker');
    this.calendarContent = this.myCalendar.$datepicker.children('.datepicker--content');
    const Input1 = item.querySelector('.date-dropdown__input-1');
    const Input2 = item.querySelector('.date-dropdown__input-2');

    this.myCalendar.update('view', 'months');
    console.log(this.myCalendar.selectedDates);
    const bottomButtons = this.createButtons(Input1, Input2);
    this.calendarEvents(bottomButtons, Input1, Input2);
    
  }

  createButtons(Input1, Input2) {
    const bottomButtons = document.createElement('div')
    const buttonClear = document.createElement('button');
    const buttonApply = document.createElement('button');

    bottomButtons.classList.add('datepicker__bottom-buttons');
    buttonClear.classList.add('datepicker__clear');
    buttonClear.classList.add('datepicker__bottom-button');
    buttonClear.textContent = 'Очистить';
    buttonClear.addEventListener('click', this.buttonClear.bind(this));
    buttonApply.classList.add('datepicker__apply');
    buttonApply.classList.add('datepicker__bottom-button');
    buttonApply.textContent = 'Применить';
    buttonApply.addEventListener('click', this.buttonApply.bind(this,Input1, Input2));
    bottomButtons.appendChild(buttonClear);
    bottomButtons.appendChild(buttonApply);

    this.addButtons(bottomButtons);
    return bottomButtons;
  }

  addButtons(buttons) {
    this.calendarContent.append(buttons);
  }

  calendarEvents(bottomButtons, Input1, Input2) {
    $(this.datepickerHere).datepicker({
      // Убираем кнопки применить и очистить если выбор месяца или года
      onChangeView: function (view) {
        if(view != 'days') {
          bottomButtons.classList.add('datepicker__bottom-buttons_hidden');
        }
        else {
          bottomButtons.classList.remove('datepicker__bottom-buttons_hidden');
        }
      },
      onSelect: function() {
        Input1.value = '';
        Input2.value = '';
      }
    })
  }

  buttonClear() {
    console.log('hello from buttonClear');
  }

  buttonApply(Input1, Input2) {
    console.log('hello from buttonApply');
    let arrayDates = this.myCalendar.selectedDates;
    if( arrayDates.length === 2) {
      arrayDates = arrayDates.map(item => item.toLocaleDateString());
      Input1.value = arrayDates[0];
      Input2.value = arrayDates[1];
    }
  }
}

export default calendar;