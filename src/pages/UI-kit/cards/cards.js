import SearchRoomCard from '../../../components/search-room-card/search-room-card.js';
import BookingRoomCard from '../../../components/booking-room-card/booking-room-card.js';

class Cards {
  constructor() {
    this.init();
  }

  init() {
    const searchCard = document.querySelector('.js-search-room-card');
    const bookingCard = document.querySelector('.js-booking-room-card');
    new SearchRoomCard(searchCard);
    new BookingRoomCard(bookingCard);
  }
}
export default Cards;
