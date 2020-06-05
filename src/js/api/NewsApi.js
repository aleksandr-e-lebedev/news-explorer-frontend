import BaseApi from './BaseApi';

export default class NewsApi extends BaseApi {
  constructor({
    baseUrl, dependencies, endpoint, sortBy, pageSize, apiKey,
  }) {
    super({
      dependencies,
    });

    this._baseUrl = baseUrl || 'https://newsapi.org/v2';
    this._endpoint = endpoint || 'everything';
    this._sortBy = sortBy || 'popularity';
    this._pageSize = pageSize || 100;
    this._apiKey = apiKey;
  }

  async getNews({ keyword, dateFrom, dateTo }) {
    const res = await fetch(
      `${this._baseUrl}`
      + `/${this._endpoint}`
      + `?q=${keyword}`
      + `&from=${dateFrom}`
      + `&to=${dateTo}`
      + `&sortBy=${this._sortBy}`
      + `&pageSize=${this._pageSize}`
      + `&apiKey=${this._apiKey}`,
      {
        method: 'GET',
      },
    );

    if (!res.ok) {
      throw this._createHttpError(res);
    } else {
      return res.json();
    }
  }
}
