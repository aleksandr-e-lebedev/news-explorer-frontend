import BaseApi from './BaseApi';

export default class MainApi extends BaseApi {
  constructor({
    baseUrl, dependencies,
  }) {
    super({
      dependencies,
    });

    this._baseUrl = baseUrl || 'http://localhost:3000';
  }

  async signup({
    name, email, password,
  }) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!res.ok) {
      throw this._createHttpError(res);
    } else {
      return res.json();
    }
  }

  async signin({
    email, password,
  }) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      throw this._createHttpError(res);
    } else {
      return res.json();
    }
  }

  async getAppData({
    token,
  }) {
    const results = await Promise.all([
      this.getUserData({ token }),
      this.getArticles({ token }),
    ]);

    return results;
  }

  async getUserData({
    token,
  }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw this._createHttpError(res);
    } else {
      return res.json();
    }
  }

  async getArticles({
    token,
  }) {
    const res = await fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw this._createHttpError(res);
    } else {
      return res.json();
    }
  }

  async createArticle({
    token, keyword, title, text, date, source, link, image,
  }) {
    const res = await fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    });

    if (!res.ok) {
      throw this._createHttpError(res);
    } else {
      return res.json();
    }
  }

  async removeArticle({
    token, id,
  }) {
    const res = await fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw this._createHttpError(res);
    } else {
      return res.json();
    }
  }
}
