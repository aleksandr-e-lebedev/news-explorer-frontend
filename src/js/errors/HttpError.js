import BaseError from './BaseError';

export default class HttpError extends BaseError {
  constructor(response) {
    super(`HTTP error! ${response.status} ${response.statusText} for ${response.url}`);

    this.response = response;
    this.statusCode = response.status;
  }
}
