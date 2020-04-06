import header from '../../../components/header/header.js';


class signIn{
  constructor() {
    this.init();
  }

  init() {
    const headerOnPage = document.querySelector('.header');
    new header(headerOnPage);
  }
}

export default signIn;