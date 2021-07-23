import Header from '../../../components/header/header.js';
import SearchRoomCard from '../../../components/search-room-card/search-room-card.js';

class LandingPage {
  constructor() {
    this.init();
  }

  init() {
    const header = document.querySelector('.js-landing-page__header');
    const searchCard = document.querySelector('.js-landing-page__search-room-card');
    new Header(header);
    new SearchRoomCard(searchCard);
  }
}

export default LandingPage;
