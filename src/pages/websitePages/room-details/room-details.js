import header from '../../../components/header/header.js';


class roomDetails{
  constructor() {
    this.init();
  }

  init() {
    this.searchHeader();
  }

  searchHeader() {
    const headerOnPage = document.querySelector('.header');
    new header(headerOnPage);
  }
}

export default roomDetails;