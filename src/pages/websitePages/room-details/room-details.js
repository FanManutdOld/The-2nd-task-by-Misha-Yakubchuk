import Header from '../../../components/header/header.js';
import LikeButton from '../../../components/like-button/like-button';
import BookingRoomCard from '../../../components/booking-room-card/booking-room-card.js';

class RoomDetails {
  constructor() {
    this.init();
  }

  init() {
    this.searchHeader();
    this.searchLikeButtons();
    this.searchBookingRoomCard();
  }

  searchHeader() {
    const header = document.querySelector('.header');
    new Header(header);
  }

  searchLikeButtons() {
    const likeButtons = document.querySelectorAll('.js-like-button');

    // для каждой кнопки на странице
    likeButtons.forEach((item) => {
      new LikeButton(item);
    });
  }

  searchBookingRoomCard() {
    const bookingCard = document.querySelector('.js-booking-room-card');
    new BookingRoomCard(bookingCard);
  }
}

export default RoomDetails;
