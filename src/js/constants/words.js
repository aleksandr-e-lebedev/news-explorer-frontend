export default {
  ru: {
    email: {
      valueMissing: 'Это обязательное поле',
      patternMismatch: 'Неправильный формат email',
    },
    password: {
      valueMissing: 'Это обязательное поле',
      tooShort: 'Пароль должен содержать не менее 8 символов',
    },
    username: {
      valueMissing: 'Это обязательное поле',
      tooShort: 'Имя должно содержать от 2 до 30 символов',
    },
    search: {
      valueMissing: 'Нужно ввести ключевое слово',
    },
    mainApi: {
      invalidRequest: 'Запрос сформирован неправильно',
      invalidEmailOrPassword: 'Неправильные почта или пароль',
      userAlreadyExists: 'Пользователь с таким email уже существует',
      tooManyRequests: 'Слишком много запросов с этого IP. Попробуйте снова через 15 минут',
      internalServerError: 'Внутренняя ошибка сервера',
    },
    network: {
      connectionProblem: 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
    },
    preloader: 'Загрузка...',
    default: 'Что-то пошло не так',
  },
};
