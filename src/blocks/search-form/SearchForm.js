import Form from '../../js/components/Form';

import './search-form.css';

export default class SearchForm extends Form {
  constructor({
    selector, domElement, dependencies, words,
    handleSubmit,
  }) {
    super({
      selector, domElement, dependencies, words, handleSubmit,
    });
  }
}
