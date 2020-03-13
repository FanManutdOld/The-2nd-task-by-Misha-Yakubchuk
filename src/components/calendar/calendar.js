class calendar {
  constructor(item) {
    this.init(item);
  }

  init(item) {
    const calendar = item.querySelector('.datepicker');
    const calendarContent = $('.datepicker--content');
    const bottomButtons = document.createElement('div')
    const buttonClear = document.createElement('button');
    const buttonApply = document.createElement('button');
    bottomButtons.classList.add('datepicker__bottom-buttons');
    buttonClear.classList.add('datepicker__clear');
    buttonClear.classList.add('datepicker__bottom-button');
    buttonClear.textContent = 'Очистить';
    buttonApply.classList.add('datepicker__apply');
    buttonApply.classList.add('datepicker__bottom-button');
    buttonApply.textContent = 'Применить';
    bottomButtons.append(buttonClear);
    bottomButtons.append(buttonApply);
    calendarContent.append(bottomButtons);
    
  }
}

export default calendar;