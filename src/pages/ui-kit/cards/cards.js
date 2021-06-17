import SearchRoomCard from '../../../components/search-room-card/search-room-card.js';
import BookingRoomCard from '../../../components/booking-room-card/booking-room-card.js';
import RoomCard from '../../../components/room-card/room-card';

class Cards {
  constructor() {
    this.init();
  }

  init() {
    const searchCard = document.querySelector('.js-search-room-card');
    const bookingCard = document.querySelector('.js-booking-room-card');
    const roomCards = document.querySelectorAll('.js-room-card');
    new SearchRoomCard(searchCard);
    new BookingRoomCard(bookingCard);
    roomCards.forEach((item) => {
      new RoomCard(item);
    });
  }
}
export default Cards;
