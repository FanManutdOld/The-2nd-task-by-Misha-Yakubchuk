import LikeButton from '../like-button/like-button';

class Comment {
  constructor(parent) {
    const comment = parent.querySelector('.js-comment');
    this.init(comment);
  }

  init(comment) {
    const likeButton = comment.querySelector('.js-comment__like-button');
    new LikeButton(likeButton);
  }
}

export default Comment;
