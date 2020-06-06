export default class BaseApi {
  constructor({
    dependencies,
  }) {
    this._dependencies = dependencies || {};
  }

  _createHttpError(res) {
    let err;

    if (this._dependencies.httpError) {
      err = new this._dependencies.httpError(res);
    } else {
      err = new Error(`HTTP error! ${res.status} ${res.statusText} for ${res.url}`);
    }

    return err;
  }
}
