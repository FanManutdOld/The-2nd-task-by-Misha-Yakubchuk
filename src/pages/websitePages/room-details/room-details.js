import Header from '../../../components/header/header.js';
import Comment from '../../../components/comment/comment.js';
import BookingRoomCard from '../../../components/booking-room-card/booking-room-card.js';

class RoomDetails {
  constructor() {
    this.init();
  }

  init() {
    this.searchHeader();
    this.searchComments();
    this.searchBookingRoomCard();
  }

  searchHeader() {
    const header = document.querySelector('.js-room-details__header');
    new Header(header);
  }

  searchComments() {
    const comments = document.querySelectorAll('.js-room-details__comment');

    comments.forEach((item) => {
      new Comment(item);
    });
  }

  searchBookingRoomCard() {
    const bookingCard = document.querySelector('.js-room-details__booking-room-card');
    new BookingRoomCard(bookingCard);
  }
}

export default RoomDetails;
