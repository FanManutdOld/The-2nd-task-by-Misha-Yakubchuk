import Header from '../../../components/header/header.js';
import SearchRoomCard from '../../../components/search-room-card/search-room-card.js';

class LandingPage {
  constructor() {
    this.init();
  }

  init() {
    const header = document.querySelector('.header');
    const searchCard = document.querySelector('.js-search-room-card');
    new Header(header);
    new SearchRoomCard(searchCard);
  }
}

export default LandingPage;
