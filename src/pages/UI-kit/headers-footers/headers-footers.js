import header from '../../../components/header/header.js';

class headersFooters{
  constructor() {
    this.init();
  }

  init() {
    const headers = document.querySelectorAll('.header');
    headers.forEach(item => {
      new header(item);
    });
  }
}

export default headersFooters;