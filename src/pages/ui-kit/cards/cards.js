import SearchRoomCard from '../../../components/search-room-card/search-room-card.js';
import BookingRoomCard from '../../../components/booking-room-card/booking-room-card.js';
import SignUpCard from '../../../components/sign-up-card/sign-up-card';
import RoomCard from '../../../components/room-card/room-card';

class Cards {
  constructor() {
    this.init();
  }

  init() {
    const searchCard = document.querySelector('.js-search-room-card');
    const bookingCard = document.querySelector('.js-booking-room-card');
    const signUpCard = document.querySelector('.js-sign-up-card');
    const roomCards = document.querySelectorAll('.js-room-card');
    new SearchRoomCard(searchCard);
    new BookingRoomCard(bookingCard);
    new SignUpCard(signUpCard);
    roomCards.forEach((item) => {
      new RoomCard(item);
    });
  }
}
export default Cards;
