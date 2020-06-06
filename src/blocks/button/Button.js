import BaseComponent from '../../js/components/BaseComponent';

import './button.css';

export default class Button extends BaseComponent {
  constructor({
    selector, domElement, dependencies,
    handleClick,
  }) {
    super({ selector, domElement, dependencies });

    this._handleClick = handleClick || (() => {});
  }

  _setDomElementChildren() {
    this._domElementChildren.buttonText = this._domElement.querySelector('.button__text');
  }

  _getEventObjects() {
    return [
      {
        element: this._domElement,
        event: 'click',
        handler: this._handleClick,
      },
    ];
  }

  getButtonText() {
    let buttonText = null;

    if (this._domElement && this._domElementChildren.buttonText) {
      buttonText = this._domElementChildren.buttonText.textContent;
    }

    return buttonText;
  }

  setButtonText(text) {
    if (this._domElement && this._domElementChildren.buttonText) {
      this._domElementChildren.buttonText.textContent = text;
    }
  }

  disable() {
    if (this._domElement) {
      this._domElement.setAttribute('disabled', true);
      this._domElement.classList.add('button_disabled');
    }
  }

  enable() {
    if (this._domElement) {
      this._domElement.removeAttribute('disabled', true);
      this._domElement.classList.remove('button_disabled');
    }
  }

  show() {
    if (this._domElement) {
      this._domElement.classList.remove('button_hidden');
    }
  }

  hide() {
    if (this._domElement) {
      this._domElement.classList.add('button_hidden');
    }
  }
}
