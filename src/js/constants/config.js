export default {
  APP_BASEURL: NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://aleksandr-e-lebedev.github.io/news-explorer-frontend',
  MAIN_API_BASEURL: 'https://api.news-app.gq',
  NEWS_API_BASEURL: 'https://praktikum.tk/news/v2',
  NEWS_API_KEY: '3c289a3a051c475c9e0052f452159691',
  CLEAR_SERVER_ERROR_TIMEOUT: 5000,
  TIME_INTERVAL_DAYS: 7,
  INDEX_OF_THE_CARD_WITH_WHICH_TO_START_SLICING: -3,
  NUMBER_OF_CARDS_TO_RENDER: 3,
};
