import ExtendedBaseComponent from '../../js/components/ExtendedBaseComponent';

import './popup.css';

export default class Popup extends ExtendedBaseComponent {
  constructor({
    selector, domElement, dependencies, container, template,
    togglePageScroll,
  }) {
    super({
      selector, domElement, dependencies, container, template,
    });

    this._contentContainer = this._domElement.querySelector('.popup__content');
    this._content = {};
    this._contentInstance = {};

    this._overlay = {};
    this._closeButton = {};

    this._togglePageScroll = togglePageScroll || (() => {});

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _setDomElementChildren() {
    this._domElementChildren.overlay = this._domElement.querySelector('.popup__overlay');
    this._domElementChildren.closeButton = this._domElement.querySelector('.popup__close');
  }

  _createDependencyInstances() {
    if (this._dependencies.overlay) {
      this._overlay = new this._dependencies.overlay({
        domElement: this._domElementChildren.overlay,
        handleClick: this.close,
      });

      if (this._overlay.domElement) {
        this._dependencyInstances.push(this._overlay);
      }
    }

    if (this._dependencies.button) {
      this._closeButton = new this._dependencies.button({
        domElement: this._domElementChildren.closeButton,
        handleClick: this.close,
      });

      if (this._closeButton.domElement) {
        this._dependencyInstances.push(this._closeButton);
      }
    }
  }

  _getEventObjects() {
    return [
      {
        element: document,
        event: 'keydown',
        handler: this._handleEscClose,
      },
    ];
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

  _handleEscClose(e) {
    if (e.key === 'Escape') this.close();
  }

  setContent({
    selector, template, popup, createContent,
  }) {
    if (this._domElement && typeof createContent === 'function') {
      const { content, contentInstance } = createContent({ selector, template, popup });

      if (content && contentInstance) {
        this._content = content;
        this._contentInstance = contentInstance;
        this._contentContainer.appendChild(this._content);
      }
    }
  }

  clearContent() {
    if (
      this._domElement
      && this._contentInstance.domElement
      && typeof this._contentInstance.remove === 'function'
    ) {
      this._contentInstance.remove();
    }
  }

  open() {
    if (this._domElement) {
      this.render();
      this._domElement.classList.add('popup_opened');
      this._showOverlay();
      this._togglePageScroll();
    }
  }

  close() {
    if (this._domElement) {
      this._domElement.classList.remove('popup_opened');
      this._hideOverlay();
      this._togglePageScroll();
      this.clearContent();
      this.remove();
    }
  }
}
