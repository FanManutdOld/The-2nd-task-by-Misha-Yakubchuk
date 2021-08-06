import DateDropdown from '../../../components/date-dropdown/date-dropdown.js';
import SearchRoomCard from '../../../components/search-room-card/search-room-card.js';
import BookingRoomCard from '../../../components/booking-room-card/booking-room-card.js';
import SignUpCard from '../../../components/sign-up-card/sign-up-card';
import RoomCard from '../../../components/room-card/room-card';

class Cards {
  constructor() {
    this.init();
  }

  init() {
    const dateDropdown = document.querySelector('.js-cards__date-dropdown');
    const searchCard = document.querySelector('.js-cards__search-room-card');
    const bookingCard = document.querySelector('.js-cards__booking-room-card');
    const signUpCard = document.querySelector('.js-cards__sign-up-card');
    const roomCards = document.querySelectorAll('.js-cards__room-card');

    new DateDropdown(dateDropdown, 'inline');
    new SearchRoomCard(searchCard);
    new BookingRoomCard(bookingCard);
    new SignUpCard(signUpCard);
    roomCards.forEach((item) => {
      new RoomCard(item);
    });
  }
}
export default Cards;
