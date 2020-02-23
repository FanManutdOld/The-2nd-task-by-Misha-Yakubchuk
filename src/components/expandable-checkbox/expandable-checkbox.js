const checkLists = document.querySelectorAll('.checkbox-list');


let toggleExpandedMod = function (checkList) {
  const checkWrapper = checkList.querySelector('.checkbox-list__wrapper');
  const checkArrow = checkWrapper.querySelector('.checkbox-list__arrow');
  const checkCheckboxes = checkList.querySelector('.checkbox-list__checkboxes');
  
  checkWrapper.addEventListener('click', function(){
    checkArrow.classList.toggle('checkbox-list__arrow_expanded');
    checkCheckboxes.classList.toggle('checkbox-list__checkboxes_expanded');
  });
};

for(let i = 0; i < checkLists.length; i++)
{
  toggleExpandedMod(checkLists[i]);
}