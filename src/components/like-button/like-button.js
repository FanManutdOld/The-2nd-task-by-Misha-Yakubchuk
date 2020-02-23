const likeButtons = document.querySelectorAll('.like-button');


let toggleLike = function (likeButton) {
  const likeHeart = likeButton.querySelector('.like-button__heart');
  const likeCount = likeButton.querySelector('.like-button__count');
  
  likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('like-button_liked');
    likeHeart.classList.toggle('like-button__heart_liked');
    likeCount.classList.toggle('like-button__count_liked');
    if(likeHeart.textContent == "favorite_border")
      likeHeart.textContent = "favorite";
    else
      likeHeart.textContent = "favorite_border";
  });
};

for(let i = 0; i < likeButtons.length; i++)
{
  toggleLike(likeButtons[i]);
}