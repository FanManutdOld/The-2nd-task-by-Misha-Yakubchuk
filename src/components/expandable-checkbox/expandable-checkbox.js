console.log('hello from expandable');
const checklists = document.querySelectorAll('.checkbox-list');
let add_mod_expanded = function (checklist) {
  const checkwrapper = checklist.querySelector('.checkbox-list__wrapper');
  const checkarrow = checkwrapper.querySelector('.checkbox-list__arrow');
  const checkcheckboxes = checklist.querySelector('.checkbox-list__checkboxes');
  checkwrapper.addEventListener('click', function(){
    checkarrow.classList.toggle('checkbox-list__arrow_expanded');
    checkcheckboxes.classList.toggle('checkbox-list__checkboxes_expanded');
  });
};

for(let i = 0; i < checklists.length; i++)
{
  add_mod_expanded(checklists[i]);
}