import Header from '../../../components/header/header.js';

class Registration {
  constructor() {
    this.init();
  }

  init() {
    const header = document.querySelector('.header');
    new Header(header);
  }
}

export default Registration;
