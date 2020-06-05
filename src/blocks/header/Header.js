import BaseComponent from '../../js/components/BaseComponent';

import './header.css';

export default class Header extends BaseComponent {
  constructor({
    selector, domElement, dependencies, backgroundColor,
    handleLoginButtonClick, handleLogoutButtonClick, togglePageScroll,
  }) {
    super({ selector, domElement, dependencies });

    this._backgroundColor = backgroundColor || 'transparent';

    this._overlay = {};
    this._loginButton = {};
    this._logoutButton = {};
    this._burger = {};

    this._isBurgerMenuOpened = false;

    this._handleLoginButtonClick = handleLoginButtonClick || (() => {});
    this._handleLogoutButtonClick = handleLogoutButtonClick || (() => {});
    this._togglePageScroll = togglePageScroll || (() => {});

    this._handleBurgerClick = this._handleBurgerClick.bind(this);
    this._closeBurgerMenu = this._closeBurgerMenu.bind(this);
  }

  _setDomElementChildren() {
    this._domElementChildren.overlay = this._domElement.querySelector('.header__overlay');
    this._domElementChildren.container = this._domElement.querySelector('.header__container');
    this._domElementChildren.menu = this._domElement.querySelector('.header__menu');
    this._domElementChildren.loginMenuItem = this._domElement.querySelector('.header__item_type_login');
    this._domElementChildren.loginButton = this._domElement.querySelector('.header__button_type_login');
    this._domElementChildren.savedArticlesMenuItem = this._domElement.querySelector('.header__item_type_saved-articles');
    this._domElementChildren.logoutMenuItem = this._domElement.querySelector('.header__item_type_logout');
    this._domElementChildren.logoutButton = this._domElement.querySelector('.header__button_type_logout');
    this._domElementChildren.burger = this._domElement.querySelector('.header__burger');
  }

  _createDependencyInstances() {
    if (this._dependencies.overlay) {
      this._overlay = new this._dependencies.overlay({
        domElement: this._domElementChildren.overlay,
        handleClick: this._closeBurgerMenu,
      });

      if (this._overlay.domElement) {
        this._dependencyInstances.push(this._overlay);
      }
    }

    if (this._dependencies.button) {
      this._loginButton = new this._dependencies.button({
        domElement: this._domElementChildren.loginButton,
        handleClick: this._handleLoginButtonClick,
      });

      if (this._loginButton.domElement) {
        this._dependencyInstances.push(this._loginButton);
      }

      this._logoutButton = new this._dependencies.button({
        domElement: this._domElementChildren.logoutButton,
        handleClick: this._handleLogoutButtonClick,
      });

      if (this._logoutButton.domElement) {
        this._dependencyInstances.push(this._logoutButton);
      }

      this._burger = new this._dependencies.button({
        domElement: this._domElementChildren.burger,
        handleClick: this._handleBurgerClick,
      });

      if (this._burger.domElement) {
        this._dependencyInstances.push(this._burger);
      }
    }
  }

  _handleBurgerClick() {
    if (this._isBurgerMenuOpened) {
      this._closeBurgerMenu();
    } else {
      this._openBurgerMenu();
    }
  }

  _openBurgerMenu() {
    this._isBurgerMenuOpened = true;

    this._togglePageScroll();
    this._showOverlay();
    this._toggleElementsForBurgerMenu();
  }

  _closeBurgerMenu() {
    this._isBurgerMenuOpened = false;

    this._toggleElementsForBurgerMenu();
    this._hideOverlay();
    this._togglePageScroll();
  }

  _showOverlay() {
    if (this._overlay.domElement && typeof this._overlay.show === 'function') {
      this._overlay.show();
    }
  }

  _hideOverlay() {
    if (this._overlay.domElement && typeof this._overlay.hide === 'function') {
      this._overlay.hide();
    }
  }

  _toggleElementsForBurgerMenu() {
    if (
      this._domElementChildren.burger
      && this._domElementChildren.container
      && this._domElementChildren.menu
    ) {
      this._domElementChildren.burger.classList.toggle('header__burger_active');
      this._domElementChildren.container.classList.toggle('header__container_mobile-menu-active');
      this._domElementChildren.menu.classList.toggle('header__menu_mobile-menu-active');
    }
  }

  _setUserName(userName) {
    if (this._logoutButton.domElement && typeof this._logoutButton.setButtonText === 'function') {
      this._logoutButton.setButtonText(userName);
    }
  }

  _setBackgroundColor() {
    this._domElement.style.backgroundColor = this._backgroundColor;
  }

  _getElementsToToggleState() {
    return [
      {
        element: this._domElementChildren.loginMenuItem,
        method: {
          isLoggedIn: 'add',
          isLoggedOut: 'remove',
        },
        classToToggle: 'header__item_hidden',
      },
      {
        element: this._domElementChildren.savedArticlesMenuItem,
        method: {
          isLoggedIn: 'remove',
          isLoggedOut: 'add',
        },
        classToToggle: 'header__item_hidden',
      },
      {
        element: this._domElementChildren.logoutMenuItem,
        method: {
          isLoggedIn: 'remove',
          isLoggedOut: 'add',
        },
        classToToggle: 'header__item_hidden',
      },
    ];
  }

  _toggleHeaderState({ isLoggedIn = false, userName = '' }) {
    const headerElements = this._getElementsToToggleState();

    this._setUserName(userName);

    headerElements.forEach((headerElement) => {
      const { element, method, classToToggle } = headerElement;

      if (element) {
        if (isLoggedIn) {
          element.classList[method.isLoggedIn](classToToggle);
        } else {
          element.classList[method.isLoggedOut](classToToggle);
        }
      }
    });
  }

  toggleHeaderState(args) {
    if (this._domElement) {
      this._toggleHeaderState(args);
    }
  }

  render({ isLoggedIn, userName }) {
    super.render();

    if (this._domElement) {
      this._setBackgroundColor();
      this._toggleHeaderState({ isLoggedIn, userName });
    }
  }
}
