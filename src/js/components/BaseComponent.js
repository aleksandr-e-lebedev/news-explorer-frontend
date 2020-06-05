export default class BaseComponent {
  constructor({
    selector, domElement, dependencies,
  }) {
    this._domElement = document.querySelector(selector) || domElement;
    this._domElementChildren = {};
    this._handlers = [];
    this._dependencies = dependencies || {};
    this._dependencyInstances = [];
  }

  _setDomElementChildren() {}

  _createDependencyInstances() {}

  _renderDependencyDomElements() {
    this._dependencyInstances.forEach((instance) => instance.render());
  }

  _removeDependencyDomElements() {
    this._dependencyInstances.forEach((instance) => instance.remove());
  }

  _getEventObjects() {}

  _setHandlers(eventObjects = []) {
    eventObjects.forEach((eventObj) => {
      const { element, event, handler } = eventObj;

      if (element && typeof handler === 'function') {
        element.addEventListener(event, handler);
        this._handlers.push(eventObj);
      }
    });
  }

  _removeHandlers() {
    this._handlers.forEach((eventObj) => {
      const { element, event, handler } = eventObj;

      element.removeEventListener(event, handler);
    });
  }

  get domElement() {
    return this._domElement ? this._domElement : null;
  }

  render() {
    if (this._domElement) {
      this._setDomElementChildren();
      this._createDependencyInstances();
      this._renderDependencyDomElements();
      this._setHandlers(this._getEventObjects());
    }
  }

  remove() {
    if (this._domElement) {
      this._removeDependencyDomElements();
      this._removeHandlers();
      this._domElement.remove();
    }
  }
}
