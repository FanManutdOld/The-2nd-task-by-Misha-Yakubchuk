import checkboxList from '../../../components/expandable-checkbox/expandable-checkbox';
import likeButton from '../../../components/like-button/like-button';
import dropdown from '../../../components/dropdown/dropdown.js'

new likeButton();
new checkboxList();
const dropdowns = document.querySelectorAll('.js-dropdown');

//для каждого дропдауна на странице
dropdowns.forEach(item => {

  new dropdown(item);
})

console.log('hello from form-elements');