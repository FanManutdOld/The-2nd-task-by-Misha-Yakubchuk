import searchRoomCard from '../../../components/search-room-card/search-room-card.js';
import bookingRoomCard from '../../../components/booking-room-card/booking-room-card.js';

class cards {
  constructor() {
    this.init();
  }

  init() {
    const searchCard = document.querySelector('.search-room-card');
    const bookingCard = document.querySelector('.booking-room-card');
    new searchRoomCard(searchCard);
    new bookingRoomCard(bookingCard);
  }

}
export default cards;