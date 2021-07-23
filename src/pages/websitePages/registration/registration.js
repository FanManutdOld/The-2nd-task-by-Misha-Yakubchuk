import Header from '../../../components/header/header.js';
import SignUpCard from '../../../components/sign-up-card/sign-up-card.js';

class Registration {
  constructor() {
    this.init();
  }

  init() {
    const header = document.querySelector('.js-registration__header');
    const signUpCard = document.querySelector('.js-registration__sign-up-card');
    new Header(header);
    new SignUpCard(signUpCard);
  }
}

export default Registration;
