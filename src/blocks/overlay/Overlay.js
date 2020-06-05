import BaseComponent from '../../js/components/BaseComponent';

import './overlay.css';

export default class Overlay extends BaseComponent {
  constructor({
    selector, domElement, dependencies,
    handleClick,
  }) {
    super({ selector, domElement, dependencies });

    this._handleClick = handleClick || (() => {});

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
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

  show() {
    if (this._domElement) {
      this._domElement.classList.add('overlay_active');
    }
  }

  hide() {
    if (this._domElement) {
      this._domElement.classList.remove('overlay_active');
    }
  }
}
