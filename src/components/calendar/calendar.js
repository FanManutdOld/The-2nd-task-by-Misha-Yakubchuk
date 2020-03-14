class calendar {
  constructor(item) {
    this.init(item);
  }

  init(item) {
    this.input = item.querySelector('.datepicker-here');
    //this.input = $('.data-dropdown__calendar');
    this.myDatepicker = $(this.input).datepicker().data('datepicker');
    this.calendarContent = this.myDatepicker.$datepicker.children('.datepicker--content');

    this.createButtons();

  }

  createButtons() {
    const bottomButtons = document.createElement('div')
    const buttonClear = document.createElement('button');
    const buttonApply = document.createElement('button');

    bottomButtons.classList.add('datepicker__bottom-buttons');
    buttonClear.classList.add('datepicker__clear');
    buttonClear.classList.add('datepicker__bottom-button');
    buttonClear.textContent = 'Очистить';
    buttonClear.addEventListener('click', this.buttonClear);
    buttonApply.classList.add('datepicker__apply');
    buttonApply.classList.add('datepicker__bottom-button');
    buttonApply.textContent = 'Применить';
    buttonApply.addEventListener('click', this.buttonApply);
    bottomButtons.appendChild(buttonClear);
    bottomButtons.appendChild(buttonApply);
    this.addButtons(bottomButtons);

    $(this.input).datepicker({
      // Передаем функцию, которая добавляет 11 числу каждого месяца класс 'my-class'
      // и делает их невозможными к выбору.
      onChangeView: function (view) {
        if(view != 'days') {
          bottomButtons.classList.add('datepicker__bottom-buttons_hidden');
        }
        else {
          bottomButtons.classList.remove('datepicker__bottom-buttons_hidden');
        }
      }
    })
  }

  addButtons(buttons) {
    this.calendarContent.append(buttons);
  }

  buttonClear() {
    console.log('hello from buttonClear');
  }

  buttonApply() {
    console.log('hello from buttonApply');

  }
}

export default calendar;