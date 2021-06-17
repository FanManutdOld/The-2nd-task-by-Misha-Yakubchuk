import Header from '../../../components/header/header.js';

class HeadersFooters {
  constructor() {
    this.init();
  }

  init() {
    const headers = document.querySelectorAll('.header');
    headers.forEach((item) => {
      new Header(item);
    });
  }
}

export default HeadersFooters;
