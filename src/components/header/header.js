class Header {
  constructor(parent) {
    const header = parent.querySelector('.js-header');
    this.init(header);
  }

  init(header) {
    this.bindHandleSubmenuClick(header);
    this.bindHandleBurgerClick(header);
    this.bindHandleUserClick(header);
  }

  bindHandleSubmenuClick(header) {
    this.submenuArray = header.querySelectorAll('.js-header__nav-item');
    this.submenuArray.forEach((item) => {
      const submenu = item.querySelector('.js-header__submenu');
      item.addEventListener('click', this.handleSubmenuClick.bind(this, submenu));
    });
  }

  bindHandleBurgerClick(header) {
    this.burger = header.querySelector('.js-header__burger');
    this.navbar = header.querySelector('.js-header__navbar');
    this.burger.addEventListener('click', this.handleBurgerClick.bind(this));
  }

  bindHandleUserClick(header) {
    this.user = header.querySelector('.js-header__user-icon');
    if (header.querySelector('.js-header__buttons')) {
      this.userDropdown = header.querySelector('.js-header__buttons');
      this.userDropdownClass = 'header__buttons_shown';
    } else {
      this.userDropdown = header.querySelector('.js-header__username');
      this.userDropdownClass = 'header__username_shown';
    }
    this.user.addEventListener('click', this.handleUserClick.bind(this));
  }

  handleSubmenuClick(submenu) {
    submenu.classList.toggle('header__submenu_hidden');
  }

  handleBurgerClick() {
    this.navbar.classList.toggle('header__navbar_shown');
    if (this.userDropdown.classList.contains(this.userDropdownClass)) {
      this.userDropdown.classList.remove(this.userDropdownClass);
    }
  }

  handleUserClick() {
    this.userDropdown.classList.toggle(this.userDropdownClass);
    if (this.navbar.classList.contains('header__navbar_shown')) {
      this.navbar.classList.remove('header__navbar_shown');
    }
  }
}

export default Header;
