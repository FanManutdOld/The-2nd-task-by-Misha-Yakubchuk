import header from '../../../components/header/header.js';
import searchRoomCard from '../../../components/search-room-card/search-room-card.js';


class landingPage{
  constructor() {
    this.init();
  }

  init() {
    const headerOnPage = document.querySelector('.header');
    const searchCard = document.querySelector('.js-search-room-card');
    new header(headerOnPage);
    new searchRoomCard(searchCard);
  }
}

export default landingPage;