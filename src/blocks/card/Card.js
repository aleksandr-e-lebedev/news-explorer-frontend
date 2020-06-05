import BaseComponent from '../../js/components/BaseComponent';

import './card.css';

export default class Card extends BaseComponent {
  constructor({
    selector, domElement, dependencies, template,
    keyword, link, image, date, title, text, source, _id,
    handleBookmarkClick, handleTrashClick,
  }) {
    super({ selector, domElement, dependencies });

    this._template = document.querySelector(template);
    this._domElement = this._template.content.cloneNode(true).querySelector(selector);

    this._keyword = keyword;
    this._link = link;
    this._image = image;
    this._date = date;
    this._title = title;
    this._text = text;
    this._source = source;
    this._id = _id || null;

    this._isBookmarkSet = false;

    this._bookmark = {};
    this._trash = {};

    this._handleBookmarkClick = handleBookmarkClick || (() => {});
    this._handleTrashClick = handleTrashClick || (() => {});

    this._handleBookmarkClick = this._handleBookmarkClick.bind(this);
    this._handleTrashClick = this._handleTrashClick.bind(this);
  }

  _setDomElementChildren() {
    this._domElementChildren.keyword = this._domElement.querySelector('.card__keyword-value');
    this._domElementChildren.link = this._domElement.querySelector('.card__link');
    this._domElementChildren.image = this._domElement.querySelector('.card__image');
    this._domElementChildren.date = this._domElement.querySelector('.card__date');
    this._domElementChildren.title = this._domElement.querySelector('.card__title');
    this._domElementChildren.text = this._domElement.querySelector('.card__text');
    this._domElementChildren.source = this._domElement.querySelector('.card__source');
    this._domElementChildren.bookmark = this._domElement.querySelector('.card__controls-button_type_bookmark');
    this._domElementChildren.trash = this._domElement.querySelector('.card__controls-button_type_trash');
    this._domElementChildren.tooltip = this._domElement.querySelector('.card__controls-tooltip');
  }

  _createDependencyInstances() {
    if (this._dependencies.button) {
      this._bookmark = new this._dependencies.button({
        domElement: this._domElementChildren.bookmark,
        handleClick: this._handleBookmarkClick,
      });

      if (this._bookmark.domElement) {
        this._dependencyInstances.push(this._bookmark);
      }

      this._trash = new this._dependencies.button({
        domElement: this._domElementChildren.trash,
        handleClick: this._handleTrashClick,
      });

      if (this._trash.domElement) {
        this._dependencyInstances.push(this._trash);
      }
    }
  }

  _setData() {
    this._domElementChildren.link.href = this._link;
    this._domElementChildren.image.src = this._image;
    this._domElementChildren.date.textContent = this._date;
    this._domElementChildren.title.textContent = this._title;
    this._domElementChildren.text.textContent = this._text;
    this._domElementChildren.source.textContent = this._source;

    if (this._domElementChildren.keyword) {
      this._domElementChildren.keyword.textContent = this._keyword;
    }
  }

  set id(value) {
    if (this._domElement) {
      this._id = value;
    }
  }

  get id() {
    return this._domElement ? this._id : null;
  }

  set isBookmarkSet(value) {
    if (this._domElement) {
      this._isBookmarkSet = value;
    }
  }

  get isBookmarkSet() {
    return this._domElement ? this._isBookmarkSet : null;
  }

  toggleTooltipState({ isLoggedIn = false }) {
    if (this._domElement) {
      if (isLoggedIn) {
        this._domElementChildren.tooltip.classList.remove('card__controls-tooltip_active');
      } else {
        this._domElementChildren.tooltip.classList.add('card__controls-tooltip_active');
      }
    }
  }

  renderBookmark() {
    if (this._domElement) {
      if (this._isBookmarkSet) {
        this._domElementChildren.bookmark.classList.add('card__controls-button_marked');
      } else {
        this._domElementChildren.bookmark.classList.remove('card__controls-button_marked');
      }
    }
  }

  render() {
    super.render();

    if (this._domElement) {
      this._setData();
    }

    return this._domElement;
  }
}
