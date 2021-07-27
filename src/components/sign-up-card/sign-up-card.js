import MaskedTextField from '../masked-text-field/masked-text-field';

class SignUpCard {
  constructor(parent) {
    const card = parent.querySelector('.js-sign-up-card');
    this.searchMasked(card);
  }

  searchMasked(card) {
    const masked = card.querySelector('.js-sign-up-card__birthday');

    new MaskedTextField(masked);
  }
}

export default SignUpCard;
