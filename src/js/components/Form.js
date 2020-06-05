import BaseComponent from './BaseComponent';

export default class Form extends BaseComponent {
  constructor({
    selector, domElement, dependencies, words,
    handleSubmit,
  }) {
    super({ selector, domElement, dependencies });

    this._formType = selector.slice(1);

    this._words = words || {};

    this._submitButton = {};

    this._handleSubmit = handleSubmit || (() => {});

    this._handleInput = this._handleInput.bind(this);
  }

  _setDomElementChildren() {
    this._domElementChildren.inputList = [...this._domElement.querySelectorAll('.form__input')];
    this._domElementChildren.submitButton = this._domElement.querySelector('.form__button');
  }

  _createDependencyInstances() {
    if (this._dependencies.button) {
      this._submitButton = new this._dependencies.button({
        domElement: this._domElementChildren.submitButton,
      });

      if (this._submitButton.domElement) {
        this._dependencyInstances.push(this._submitButton);
      }
    }
  }

  _getEventObjects() {
    return [
      {
        element: this._domElement,
        event: 'input',
        handler: this._handleInput,
      },
      {
        element: this._domElement,
        event: 'submit',
        handler: this._handleSubmit,
      },
    ];
  }

  _handleInput(e) {
    this._validateInput(e.target);
  }

  _validateInput(inputElement) {
    let errorMessage = '';

    if (!inputElement.validity.valid) {
      if (inputElement.validity.valueMissing) {
        errorMessage = this._words[inputElement.name]?.valueMissing
        || inputElement.validationMessage;
      }

      if (inputElement.validity.patternMismatch) {
        errorMessage = this._words[inputElement.name]?.patternMismatch
        || inputElement.validationMessage;
      }

      if (inputElement.validity.tooShort) {
        errorMessage = this._words[inputElement.name]?.tooShort
        || inputElement.validationMessage;
      }

      this._showInputError(inputElement, errorMessage);
    } else {
      errorMessage = '';

      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._domElement.querySelector(`#error-${inputElement.id}`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._formType}__error_active`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._domElement.querySelector(`#error-${inputElement.id}`);

    errorElement.classList.remove(`${this._formType}__error_active`);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._isAnyInputInvalid()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _isAnyInputInvalid() {
    return this._domElementChildren.inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _disableSubmitButton() {
    if (this._submitButton.domElement && typeof this._submitButton.disable === 'function') {
      this._submitButton.disable();
    }
  }

  _enableSubmitButton() {
    if (this._submitButton.domElement && typeof this._submitButton.enable === 'function') {
      this._submitButton.enable();
    }
  }

  _disableInputElements() {
    this._domElementChildren.inputList.forEach((inputElement) => {
      inputElement.setAttribute('disabled', true);
      inputElement.classList.add(`${this._formType}__input_disabled`);
    });
  }

  _enableInputElements() {
    this._domElementChildren.inputList.forEach((inputElement) => {
      inputElement.removeAttribute('disabled', true);
      inputElement.classList.remove(`${this._formType}__input_disabled`);
    });
  }

  disableForm() {
    if (this._domElement) {
      this._disableInputElements();
      this._disableSubmitButton();
    }
  }

  enableForm() {
    if (this._domElement) {
      this._enableInputElements();
      this._enableSubmitButton();
    }
  }

  validateForm() {
    if (this._domElement) {
      this._domElementChildren.inputList.forEach((element) => this._validateInput(element));
    }
  }

  isFormValid() {
    if (this._domElement) {
      return !this._isAnyInputInvalid();
    }

    return false;
  }

  getData() {
    let data = null;

    if (this._domElement) {
      data = {};

      this._domElementChildren.inputList.forEach((inputElement) => {
        data[inputElement.name] = inputElement.value;
      });
    }

    return data;
  }
}
