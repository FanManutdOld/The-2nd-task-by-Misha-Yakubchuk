class likeButton {
  constructor(likeButton) {
    this.init(likeButton);
  }

  init(likeButton) {
    this.likeButton = likeButton;
    this.likeHeart = likeButton.querySelector('.js-like-button__heart');
    this.likeCount = likeButton.querySelector('.js-like-button__count');

    this.bindToggleLike();
  }

  bindToggleLike() {
    this.likeButton.addEventListener('click', this.toggleLike.bind(this));
  }

  toggleLike() {
    this.likeButton.classList.toggle('like-button_liked');
    this.likeHeart.classList.toggle('like-button__heart_liked');
    this.likeCount.classList.toggle('like-button__count_liked');
    if (this.likeHeart.textContent == "favorite_border")
      this.likeHeart.textContent = "favorite";
    else
      this.likeHeart.textContent = "favorite_border";
  }
}

export default likeButton;