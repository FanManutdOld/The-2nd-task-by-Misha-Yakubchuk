import Masked from '../masked/masked';

class SignUpCard {
  constructor(parent) {
    this.searchMasked(parent);
  }

  searchMasked(parent) {
    const masked = parent.querySelector('.js-masked');

    new Masked(masked);
  }
}

export default SignUpCard;
