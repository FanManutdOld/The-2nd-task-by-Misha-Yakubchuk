class likeButton {
  constructor() {
    this.init();
  }

  init() {
    const likeButtons = document.querySelectorAll('.js-like-button');
    
    likeButtons.forEach(item => {
      this.bindEventListeners(item);
    })
  }

  bindEventListeners(likeButton) {
    const likeHeart = likeButton.querySelector('.js-like-button__heart');
    const likeCount = likeButton.querySelector('.js-like-button__count');

    likeButton.addEventListener('click', this.toggleLike.bind(null, likeButton, likeHeart, likeCount));
  }

  toggleLike(likeButton, likeHeart, likeCount) {
    likeButton.classList.toggle('like-button_liked');
    likeHeart.classList.toggle('like-button__heart_liked');
    likeCount.classList.toggle('like-button__count_liked');
    if (likeHeart.textContent == "favorite_border")
      likeHeart.textContent = "favorite";
    else
      likeHeart.textContent = "favorite_border";
  }
}

export default likeButton;