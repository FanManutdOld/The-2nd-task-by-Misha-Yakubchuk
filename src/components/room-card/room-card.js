class RoomCard {
  constructor(parent) {
    const roomCard = parent.querySelector('.js-room-card');
    this.init(roomCard);
  }

  init(roomCard) {
    this.count = 0;
    this.gallery = roomCard.querySelector('.js-room-card__gallery');
    this.leftArrow = roomCard.querySelector('.js-room-card__arrow');
    this.rightArrow = roomCard.querySelector('.js-room-card__arrow_position_right');
    this.circles = roomCard.querySelectorAll('.js-room-card__circle');

    this.leftArrow.addEventListener('click', this.handleLeftArrowClick.bind(this));
    this.rightArrow.addEventListener('click', this.handleRightArrowClick.bind(this));
    this.circles.forEach((item, index) => {
      item.addEventListener('click', this.handleCircleClick.bind(this, index));
    });
  }

  handleLeftArrowClick() {
    this.count -= 1;
    if (this.count < 0) {
      this.count = 0;
    } else {
      const position = -271 * this.count;
      this.gallery.style.marginLeft = `${position}px`;
      this.circles[this.count].classList.add('room-card__circle_active');
      this.circles[this.count + 1].classList.remove('room-card__circle_active');
    }
  }

  handleRightArrowClick() {
    this.count += 1;
    if (this.count > 3) {
      this.count = 3;
    } else {
      const position = -271 * this.count;
      this.gallery.style.marginLeft = `${position}px`;
      this.circles[this.count].classList.add('room-card__circle_active');
      this.circles[this.count - 1].classList.remove('room-card__circle_active');
    }
  }

  handleCircleClick(number) {
    this.count = number;
    const position = -271 * this.count;
    this.gallery.style.marginLeft = `${position}px`;
    this.circles.forEach((item) => {
      item.classList.remove('room-card__circle_active');
    });
    this.circles[this.count].classList.add('room-card__circle_active');
  }
}

export default RoomCard;
