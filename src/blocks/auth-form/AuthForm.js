import Form from '../../js/components/Form';

import './auth-form.css';

export default class AuthForm extends Form {
  constructor({
    selector, domElement, dependencies, template, words, preloaderText,
    handleSubmit, handleSignupLinkClick, handleLoginLinkClick,
  }) {
    super({
      selector, domElement, dependencies, words, handleSubmit,
    });

    this._template = document.querySelector(template);
    this._domElement = this._template.content.cloneNode(true).querySelector(selector);

    this._preloaderText = preloaderText;
    this._submitButtonInitialText = null;

    this._handleSignupLinkClick = handleSignupLinkClick || (() => {});
    this._handleLoginLinkClick = handleLoginLinkClick || (() => {});
  }

  _setDomElementChildren() {
    super._setDomElementChildren();
    this._domElementChildren.serverError = this._domElement.querySelector('.auth-form__error_type_server-error');
    this._domElementChildren.signupLink = this._domElement.querySelector('.auth-form__toggle-link_type_signup');
    this._domElementChildren.loginLink = this._domElement.querySelector('.auth-form__toggle-link_type_login');
  }

  _getEventObjects() {
    return [
      ...super._getEventObjects(),
      {
        element: this._domElementChildren.signupLink,
        event: 'click',
        handler: this._handleSignupLinkClick,
      },
      {
        element: this._domElementChildren.loginLink,
        event: 'click',
        handler: this._handleLoginLinkClick,
      },
    ];
  }

  _handleInput(e) {
    this._clearServerError();
    super._handleInput(e);
  }

  _validateInput(inputElement) {
    super._validateInput(inputElement);
    this._toggleButtonState();
  }

  _setServerError(errorMessage) {
    if (this._domElementChildren.serverError) {
      this._domElementChildren.serverError.textContent = errorMessage;
      this._domElementChildren.serverError.classList.add('auth-form__error_active');
    }
  }

  _clearServerError() {
    if (this._domElementChildren.serverError) {
      this._domElementChildren.serverError.classList.remove('auth-form__error_active');
      this._domElementChildren.serverError.textContent = '';
    }
  }

  showPreloader() {
    if (
      this._domElement
      && typeof this._preloaderText === 'string'
      && this._submitButton.domElement
      && typeof this._submitButton.getButtonText === 'function'
      && typeof this._submitButton.setButtonText === 'function'
    ) {
      this._submitButtonInitialText = this._submitButton.getButtonText();
      this._submitButton.setButtonText(this._preloaderText);
    }
  }

  hidePreloader() {
    if (
      this._domElement
      && typeof this._submitButtonInitialText === 'string'
    ) {
      this._submitButton.setButtonText(this._submitButtonInitialText);
    }
  }

  setServerError(errorMessage) {
    if (this._domElement) {
      this._setServerError(errorMessage);
    }
  }

  clearServerError() {
    if (this._domElement) {
      this._clearServerError();
    }
  }

  render() {
    super.render();

    return this._domElement ? this._domElement : null;
  }
}
