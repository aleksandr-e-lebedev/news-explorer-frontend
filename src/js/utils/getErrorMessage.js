import HttpError from '../errors/HttpError';

import words from '../constants/words';

export default (err) => {
  let errorMessage = '';

  if (err instanceof HttpError) {
    if (err.statusCode === 400) errorMessage = words.ru.mainApi.invalidRequest;
    if (err.statusCode === 401) errorMessage = words.ru.mainApi.invalidEmailOrPassword;
    if (err.statusCode === 409) errorMessage = words.ru.mainApi.userAlreadyExists;
    if (err.statusCode === 429) errorMessage = words.ru.mainApi.tooManyRequests;
    if (err.statusCode === 500) errorMessage = words.ru.mainApi.internalServerError;
  } else if (err instanceof TypeError) {
    if (
      err.message === 'Failed to fetch'
      || err.message === 'NetworkError when attempting to fetch resource.'
    ) {
      errorMessage = words.ru.network.connectionProblem;
    }
  } else {
    errorMessage = words.ru.default;
  }

  return errorMessage;
};
