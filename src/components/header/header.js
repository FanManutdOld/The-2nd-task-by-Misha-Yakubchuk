class header{
  constructor (item) {
    this.init(item);
  }

  init(header) {
    this.submenuArray = header.querySelectorAll('.js-header__nav-item')
    this.submenuArray.forEach(item => {
      const submenu = item.querySelector('.js-header__submenu');
      item.addEventListener('click', this.handleSubmenuClick.bind(this, submenu));
    });
  } 

  handleSubmenuClick(submenu) {
    submenu.classList.toggle('header__submenu_hidden');
  }
}

export default header;