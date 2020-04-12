import header from '../../../components/header/header.js';
import likeButton from '../../../components/like-button/like-button';
import bookingRoomCard from '../../../components/booking-room-card/booking-room-card.js';


class roomDetails{
  constructor() {
    this.init();
  }

  init() {
    this.searchHeader();
    this.searchLikeButtons();
    this.searchBookingRoomCard();
  }

  searchHeader() {
    const headerOnPage = document.querySelector('.header');
    new header(headerOnPage);
  }

  searchLikeButtons() {
    const likeButtons = document.querySelectorAll('.js-like-button');
    
    //для каждой кнопки на странице
    likeButtons.forEach(item => {
      new likeButton(item);
    });
  }

  searchBookingRoomCard() {
    const bookingCard = document.querySelector('.js-booking-room-card');
    new bookingRoomCard(bookingCard);
  }
}

export default roomDetails;