import ExtendedBaseComponent from '../../js/components/ExtendedBaseComponent';

import './card-list.css';

export default class CardList extends ExtendedBaseComponent {
  constructor({
    selector, domElement, dependencies, container, template,
    handleMoreResultsButtonClick,
  }) {
    super({
      selector, domElement, dependencies, container, template,
    });

    this._cardContainer = this._domElement.querySelector('.card-list__grid');
    this._cardInstances = [];

    this._moreResultsButton = {};

    this._handleMoreResultsButtonClick = handleMoreResultsButtonClick || (() => {});
  }

  _setDomElementChildren() {
    this._domElementChildren.moreResultsButton = this._domElement.querySelector('.card-list__button');
  }

  _createDependencyInstances() {
    if (this._dependencies.button) {
      this._moreResultsButton = new this._dependencies.button({
        domElement: this._domElementChildren.moreResultsButton,
        handleClick: this._handleMoreResultsButtonClick,
      });

      if (this._moreResultsButton.domElement) {
        this._dependencyInstances.push(this._moreResultsButton);
      }
    }
  }

  get cardInstances() {
    return this._domElement ? this._cardInstances : null;
  }

  renderCards(cards, createCard) {
    if (
      this._domElement
      && Array.isArray(cards)
      && typeof createCard === 'function'
    ) {
      cards.forEach((card) => {
        const { cardElement, cardInstance } = createCard(card);

        if (cardElement && cardInstance) {
          this._cardContainer.appendChild(cardElement);
          this._cardInstances.push(cardInstance);
        }
      });
    }
  }

  clearContent() {
    if (this._domElement) {
      this._cardInstances.forEach((card) => {
        if (typeof card.remove === 'function') {
          card.remove();
        }
      });
    }
  }

  showMoreResultsButton() {
    if (
      this._domElement
      && this._moreResultsButton.domElement
      && typeof this._moreResultsButton.show === 'function'
    ) {
      this._moreResultsButton.show();
    }
  }

  hideMoreResultsButton() {
    if (
      this._domElement
      && this._moreResultsButton.domElement
      && typeof this._moreResultsButton.hide === 'function'
    ) {
      this._moreResultsButton.hide();
    }
  }
}
