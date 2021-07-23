import Masked from '../masked/masked';

class SignUpCard {
  constructor(parent) {
    const card = parent.querySelector('.js-sign-up-card');
    this.searchMasked(card);
  }

  searchMasked(card) {
    const masked = card.querySelector('.js-sign-up-card__birthday');

    new Masked(masked);
  }
}

export default SignUpCard;
