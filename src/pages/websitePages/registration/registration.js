import Header from '../../../components/header/header.js';

class Registration {
  constructor() {
    this.init();
  }

  init() {
    const headerOnPage = document.querySelector('.header');
    new Header(headerOnPage);
  }
}

export default Registration;
