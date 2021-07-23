class LikeButton {
  constructor(parent) {
    const likeButton = parent.querySelector('.js-like-button');
    this.init(likeButton);
  }

  init(likeButton) {
    this.likeButton = likeButton;
    this.likeHeart = likeButton.querySelector('.js-like-button__heart');
    this.likeCount = likeButton.querySelector('.js-like-button__count');

    this.bindHandleLikeButtonClick();
  }

  bindHandleLikeButtonClick() {
    this.likeButton.addEventListener('click', this.handleLikeButtonClick.bind(this));
  }

  handleLikeButtonClick() {
    this.likeButton.classList.toggle('like-button_liked');
    this.likeHeart.classList.toggle('like-button__heart_liked');
    this.likeCount.classList.toggle('like-button__count_liked');
    if (this.likeHeart.textContent === 'favorite_border') {
      this.likeHeart.textContent = 'favorite';
      this.likeCount.textContent = Number(this.likeCount.textContent) + 1;
    } else {
      this.likeHeart.textContent = 'favorite_border';
      this.likeCount.textContent = Number(this.likeCount.textContent) - 1;
    }
  }
}

export default LikeButton;
