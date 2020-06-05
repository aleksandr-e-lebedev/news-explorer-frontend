import BaseComponent from '../../js/components/BaseComponent';

import './summary.css';

export default class Summary extends BaseComponent {
  constructor({
    selector, domElement, dependencies,
  }) {
    super({ selector, domElement, dependencies });
  }

  _setDomElementChildren() {
    this._domElementChildren.userName = this._domElement.querySelector('.summary__username');
    this._domElementChildren.articlesCounter = this._domElement.querySelector('.summary__articles-counter');
    this._domElementChildren.keywords = this._domElement.querySelector('.summary__keywords');
    this._domElementChildren.keywordsText = this._domElement.querySelector('.summary__keywords-text');
    this._domElementChildren.firstKeyword = this._domElement.querySelector('.summary__keyword_type_first');
    this._domElementChildren.keywordsComma = this._domElement.querySelector('.summary__keywords-comma');
    this._domElementChildren.secondKeyword = this._domElement.querySelector('.summary__keyword_type_second');
    this._domElementChildren.keywordsConjunction = this._domElement.querySelector('.summary__keywords-conjunction');
    this._domElementChildren.thirdKeyword = this._domElement.querySelector('.summary__keyword_type_third');
    this._domElementChildren.keywordCounter = this._domElement.querySelector('.summary__keyword_type_counter');
    this._domElementChildren.otherKeywords = this._domElement.querySelector('.summary__keyword_type_others');
  }

  _setUserName(userName) {
    if (this._domElementChildren.userName) {
      this._domElementChildren.userName.textContent = userName;
    }
  }

  _setArticlesCounter(articlesCount) {
    if (this._domElementChildren.articlesCounter) {
      this._domElementChildren.articlesCounter.textContent = articlesCount;
    }
  }

  _setKeywords({
    totalKeywordCount = 0, firstKeyword = '', secondKeyword = '', thirdKeyword = '', otherKeywordCount = '',
  }) {
    if (totalKeywordCount !== 0) {
      this._domElementChildren.keywords.classList.remove('summary__keywords_hidden');
      this._domElementChildren.firstKeyword.textContent = firstKeyword;
      this._domElementChildren.secondKeyword.textContent = secondKeyword;
      this._domElementChildren.thirdKeyword.textContent = thirdKeyword;
      this._domElementChildren.keywordCounter.textContent = otherKeywordCount;

      if (totalKeywordCount > 1) {
        this._domElementChildren.keywordsText.textContent = 'По ключевым словам:';
        this._domElementChildren.keywordsComma.textContent = ',';
      } else {
        this._domElementChildren.keywordsText.textContent = 'По ключевому слову:';
        this._domElementChildren.keywordsComma.textContent = '';
      }

      if (totalKeywordCount > 2) {
        this._domElementChildren.keywordsConjunction.textContent = 'и';
      } else {
        this._domElementChildren.keywordsConjunction.textContent = '';
      }

      if (totalKeywordCount > 3) {
        this._domElementChildren.otherKeywords.textContent = 'другим';
      } else {
        this._domElementChildren.otherKeywords.textContent = '';
      }
    } else {
      this._domElementChildren.keywords.classList.add('summary__keywords_hidden');
    }
  }

  setArticlesCounter(articlesCount) {
    if (this._domElement) {
      this._setArticlesCounter(articlesCount);
    }
  }

  setKeywords(rankedKeywords) {
    if (this._domElement) {
      this._setKeywords(rankedKeywords);
    }
  }

  render({ userName, articlesCount, rankedKeywords }) {
    super.render();

    if (this._domElement) {
      this._setUserName(userName);
      this._setArticlesCounter(articlesCount);
      this._setKeywords(rankedKeywords);
    }
  }
}
