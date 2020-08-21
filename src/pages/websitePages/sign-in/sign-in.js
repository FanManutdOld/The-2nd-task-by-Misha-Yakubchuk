import Header from '../../../components/header/header.js';

class SignIn {
  constructor() {
    this.init();
  }

  init() {
    const headerOnPage = document.querySelector('.header');
    new Header(headerOnPage);
  }
}

export default SignIn;
