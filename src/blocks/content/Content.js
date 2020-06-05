import BaseComponent from '../../js/components/BaseComponent';

import './content.css';

export default class Content extends BaseComponent {
  constructor({
    selector, domElement, dependencies,
    renderLoader, removeLoader, renderNoResults, removeNoResults, renderError, removeError,
    renderResults, removeResults,
  }) {
    super({ selector, domElement, dependencies });

    this.loader = null;
    this.noResults = null;
    this.error = null;
    this.cardList = null;

    this._renderLoader = renderLoader || (() => {});
    this._removeLoader = removeLoader || (() => {});

    this._renderNoResults = renderNoResults || (() => {});
    this._removeNoResults = removeNoResults || (() => {});

    this._renderError = renderError || (() => {});
    this._removeError = removeError || (() => {});

    this._renderResults = renderResults || (() => {});
    this._removeResults = removeResults || (() => {});
  }

  renderLoader(...args) {
    if (this._domElement && typeof this._renderLoader === 'function') {
      this._renderLoader(...args);
    }
  }

  removeLoader() {
    if (this._domElement && typeof this._removeLoader === 'function') {
      this._removeLoader();
    }
  }

  renderNoResults(...args) {
    if (this._domElement && typeof this._renderNoResults === 'function') {
      this._renderNoResults(...args);
    }
  }

  removeNoResults() {
    if (this._domElement && typeof this._removeNoResults === 'function') {
      this._removeNoResults();
    }
  }

  renderError(...args) {
    if (this._domElement && typeof this._renderError === 'function') {
      this._renderError(...args);
    }
  }

  removeError() {
    if (this._domElement && typeof this._removeError === 'function') {
      this._removeError();
    }
  }

  renderResults(...args) {
    if (this._domElement && typeof this._renderResults === 'function') {
      this._renderResults(...args);
    }
  }

  removeResults() {
    if (this._domElement && typeof this._removeResults === 'function') {
      this._removeResults();
    }
  }
}
