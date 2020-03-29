import header from '../../../components/header/header.js';

class headersFooters{
  constructor() {
    this.init();
  }

  init() {
    const headerOnPage = document.querySelector('.header');
    new header(headerOnPage);
  }
}

export default headersFooters;