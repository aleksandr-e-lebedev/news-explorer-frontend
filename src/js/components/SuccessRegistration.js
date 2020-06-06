import BaseComponent from './BaseComponent';

export default class SuccessRegistration extends BaseComponent {
  constructor({
    selector, domElement, dependencies, template,
    handleLoginLinkClick,
  }) {
    super({ selector, domElement, dependencies });

    this._template = document.querySelector(template);
    this._domElement = this._template.content.cloneNode(true).querySelector(selector);

    this._handleLoginLinkClick = handleLoginLinkClick || (() => {});
  }

  _setDomElementChildren() {
    this._domElementChildren.loginLink = this._domElement.querySelector('.popup__login-link');
  }

  _getEventObjects() {
    return [
      {
        element: this._domElementChildren.loginLink,
        event: 'click',
        handler: this._handleLoginLinkClick,
      },
    ];
  }

  render() {
    super.render();

    return this._domElement ? this._domElement : null;
  }
}
