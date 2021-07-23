import Header from '../../../components/header/header.js';

class SignIn {
  constructor() {
    this.init();
  }

  init() {
    const header = document.querySelector('.js-sign-in__header');
    new Header(header);
  }
}

export default SignIn;
