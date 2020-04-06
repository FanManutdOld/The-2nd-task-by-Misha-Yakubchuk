import header from '../../../components/header/header.js';


class registration{
  constructor() {
    this.init();
  }

  init() {
    const headerOnPage = document.querySelector('.header');
    new header(headerOnPage);
  }
}

export default registration;