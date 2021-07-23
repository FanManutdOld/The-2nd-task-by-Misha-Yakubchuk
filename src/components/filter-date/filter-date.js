import Calendar from '../calendar/calendar';

class FilterDate {
  constructor(parent) {
    const filterDate = parent.querySelector('.js-filter-date');
    this.init(filterDate);
  }

  init(filterDate) {
    const numOfInputs = 1;
    new Calendar(filterDate, numOfInputs);
  }
}

export default FilterDate;
