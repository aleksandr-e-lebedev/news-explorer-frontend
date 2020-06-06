import BaseComponent from './BaseComponent';

export default class ExtendedBaseComponent extends BaseComponent {
  constructor({
    selector, domElement, dependencies, container, template,
  }) {
    super({ selector, domElement, dependencies });

    this._container = document.querySelector(container) || document.body;
    this._template = document.querySelector(template);
    this._domElement = this._template.content.cloneNode(true).querySelector(selector);
  }

  render() {
    super.render();

    if (this._domElement) {
      this._container.appendChild(this._domElement);
    }
  }
}
