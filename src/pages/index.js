import HttpError from '../js/errors/HttpError';

import MainApi from '../js/api/MainApi';
import NewsApi from '../js/api/NewsApi';

import Overlay from '../blocks/overlay/Overlay';
import SuccessRegistration from '../js/components/SuccessRegistration';
import Button from '../blocks/button/Button';
import AuthForm from '../blocks/auth-form/AuthForm';
import Popup from '../blocks/popup/Popup';
import Header from '../blocks/header/Header';
import SearchForm from '../blocks/search-form/SearchForm';
import Content from '../blocks/content/Content';
import Loading from '../blocks/loading/Loading';
import NoResults from '../blocks/no-results/NoResults';
import RequestError from '../blocks/request-error/RequestError';
import CardList from '../blocks/card-list/CardList';
import Card from '../blocks/card/Card';

import AuthState from '../js/modules/AuthState';
import Storage from '../js/modules/Storage';

import togglePageScroll from '../js/utils/togglePageScroll';
import getErrorMessage from '../js/utils/getErrorMessage';
import getTimeInterval from '../js/utils/getTimeInterval';
import getCardsData from '../js/utils/getCardsData';

import config from '../js/constants/config';
import selectors from '../js/constants/selectors';
import styles from '../js/constants/styles';
import words from '../js/constants/words';

import './index.css';

const mainApi = new MainApi({
  baseUrl: config.MAIN_API_BASEURL,
  dependencies: {
    httpError: HttpError,
  },
});

const newsApi = new NewsApi({
  baseUrl: config.NEWS_API_BASEURL,
  apiKey: config.NEWS_API_KEY,
  dependencies: {
    httpError: HttpError,
  },
});

const authState = new AuthState({
  isLoggedIn: false,
});

const content = new Content({
  selector: selectors.content,
  renderLoader: () => {
    const loading = new Loading({
      selector: selectors.loading,
      container: selectors.content,
      template: selectors.loadingTemplate,
    });

    if (loading.domElement) {
      content.loader = loading;
      content.loader.render();
    }
  },
  removeLoader: () => {
    if (content.loader) {
      content.loader.remove();
      content.loader = null;
    }
  },
  renderNoResults: () => {
    const noResults = new NoResults({
      selector: selectors.noResults,
      container: selectors.content,
      template: selectors.noResultsTemplate,
    });

    if (noResults.domElement) {
      content.noResults = noResults;
      content.noResults.render();
    }
  },
  removeNoResults: () => {
    if (content.noResults) {
      content.noResults.remove();
      content.noResults = null;
    }
  },
  renderError: () => {
    const requestError = new RequestError({
      selector: selectors.requestError,
      container: selectors.content,
      template: selectors.requestErrorTemplate,
    });

    if (requestError.domElement) {
      content.error = requestError;
      content.error.render();
    }
  },
  removeError: () => {
    if (content.error) {
      content.error.remove();
      content.error = null;
    }
  },
  renderResults: (handleMoreResultsButtonClick) => {
    const cardList = new CardList({
      selector: selectors.cardList,
      container: selectors.content,
      template: selectors.cardListTemplate,
      dependencies: {
        button: Button,
      },
      handleMoreResultsButtonClick,
    });

    if (cardList.domElement) {
      content.cardList = cardList;
      content.cardList.render();
    }
  },
  removeResults: () => {
    if (content.cardList) {
      content.cardList.clearContent();
      content.cardList.remove();
      content.cardList = null;
    }
  },
});

const header = new Header({
  selector: selectors.header,
  dependencies: {
    overlay: Overlay,
    button: Button,
  },
  backgroundColor: styles.header.backgroundColor.transparent,
  handleLoginButtonClick: () => {
    // Колбэк для Попапа - Создание формы входа/регистрации в зависимости от переданного template
    const createAuthForm = ({ selector, template, popup }) => {
      const authForm = new AuthForm({
        selector,
        dependencies: {
          button: Button,
        },
        template,
        words: words.ru,
        preloaderText: words.ru.preloader,
        handleSubmit: async (e) => {
          e.preventDefault();
          authForm.clearServerError();

          const {
            username: name,
            email,
            password,
          } = authForm.getData();

          let data = {};

          try {
            if (template.includes('signup')) {
              // Логика для формы "Регистрация нового пользователя"
              // Колбэк для Попапа - Создание сообщения об успешной регистрации
              const createSuccessRegistration = ({ selector, template, popup }) => {
                const successRegistration = new SuccessRegistration({
                  selector,
                  template,
                  handleLoginLinkClick: (e) => {
                    e.preventDefault();
                    popup.clearContent();
                    popup.setContent({
                      selector: selectors.authForm,
                      template: selectors.loginFormTemplate,
                      popup,
                      createContent: createAuthForm,
                    });
                  },
                });

                return {
                  content: successRegistration.render(),
                  contentInstance: successRegistration,
                };
              };

              authForm.disableForm();
              authForm.showPreloader();

              data = await mainApi.signup({ name, email, password });

              popup.clearContent();
              popup.setContent({
                selector: selectors.successRegistration,
                template: selectors.successRegistrationTemplate,
                popup,
                createContent: createSuccessRegistration,
              });
            } else if (template.includes('login')) {
              // Логика для формы "Вход"
              authForm.disableForm();
              authForm.showPreloader();

              data = await mainApi.signin({ email, password });

              Storage.setToken(data.token);

              authState.isLoggedIn = true;

              // Изменим состояние хедера на "Авторизован"
              header.toggleHeaderState({
                isLoggedIn: true,
                userName: data.data.user.name,
              });

              // Изменим состояние карточек на "Авторизован"
              if (content.cardList) {
                content.cardList.cardInstances.forEach((card) => {
                  // Выключим отображение tooltip
                  card.toggleTooltipState({
                    isLoggedIn: true,
                  });
                });
              }

              popup.clearContent();
              popup.close();
            }
          } catch (err) {
            authForm.hidePreloader();
            authForm.enableForm();
            authForm.setServerError(getErrorMessage(err));
            await new Promise((resolve) => setTimeout(resolve, config.CLEAR_SERVER_ERROR_TIMEOUT));
            authForm.clearServerError();
          }
        },
        handleSignupLinkClick: (e) => {
          e.preventDefault();
          popup.clearContent();
          popup.setContent({
            selector: selectors.authForm,
            template: selectors.signupFormTemplate,
            popup,
            createContent: createAuthForm,
          });
        },
        handleLoginLinkClick: (e) => {
          e.preventDefault();
          popup.clearContent();
          popup.setContent({
            selector: selectors.authForm,
            template: selectors.loginFormTemplate,
            popup,
            createContent: createAuthForm,
          });
        },
      });

      return {
        content: authForm.render(),
        contentInstance: authForm,
      };
    };

    const popup = new Popup({
      selector: selectors.popup,
      dependencies: {
        overlay: Overlay,
        button: Button,
      },
      container: selectors.page,
      template: selectors.popupTemplate,
      togglePageScroll,
    });

    popup.setContent({
      selector: selectors.authForm,
      template: selectors.loginFormTemplate,
      popup,
      createContent: createAuthForm,
    });

    popup.open();
  },
  handleLogoutButtonClick: () => {
    Storage.removeToken();

    authState.isLoggedIn = false;

    // Изменим состояние хедера на "Не авторизован"
    header.toggleHeaderState({
      isLoggedIn: false,
    });

    // Изменим состояние карточек на "Не авторизован"
    if (content.cardList) {
      content.cardList.cardInstances.forEach((card) => {
        // Сбросим id и bookmark
        if (card.id) {
          card.id = null;
          card.isBookmarkSet = false;
          card.renderBookmark();
        }

        // Включим отображение tooltip
        card.toggleTooltipState({
          isLoggedIn: false,
        });
      });
    }
  },
  togglePageScroll,
});

const searchForm = new SearchForm({
  selector: selectors.searchForm,
  dependencies: {
    button: Button,
  },
  words: words.ru,
  handleSubmit: async (e) => {
    e.preventDefault();

    searchForm.validateForm();

    if (searchForm.isFormValid()) {
      content.removeNoResults();
      content.removeError();
      content.removeResults();

      const {
        search: keyword,
      } = searchForm.getData();

      const {
        dateFrom,
        dateTo,
      } = getTimeInterval(config.TIME_INTERVAL_DAYS);

      let data = {};

      try {
        searchForm.disableForm();
        content.renderLoader();

        data = await newsApi.getNews({ keyword, dateFrom, dateTo });

        if (data.totalResults !== 0) {
          // Получим данные карточек мапированием массива данных с NewsApi
          const cardsDataToSlice = getCardsData(data, keyword).reverse();

          // Колбэк - Создание карточки
          const createCard = (cardData) => {
            const card = new Card({
              selector: selectors.card,
              dependencies: {
                button: Button,
              },
              template: selectors.cardTemplate,
              ...cardData,
              handleBookmarkClick: async () => {
                if (authState.isLoggedIn) {
                  const token = Storage.getToken();

                  let data = {};

                  try {
                    if (card.isBookmarkSet) {
                      const { id } = card;

                      data = await mainApi.removeArticle({ token, id });

                      card.id = null;
                      card.isBookmarkSet = false;
                      card.renderBookmark();
                    } else {
                      data = await mainApi.createArticle({ token, ...cardData });

                      card.id = data.data.article._id;
                      card.isBookmarkSet = true;
                      card.renderBookmark();
                    }
                  } catch (err) {
                    console.log(err.message);
                  }
                }
              },
            });

            return {
              cardElement: card.render(),
              cardInstance: card,
            };
          };

          // Колбэк - Обработка массива данных карточек, полученного мапированием массива с NewsApi
          const processCardsData = () => {
            // Будем нарезать массив карточек по три, начиная с последних добавленных
            const chunk = cardsDataToSlice.splice(
              config.INDEX_OF_THE_CARD_WITH_WHICH_TO_START_SLICING,
              config.NUMBER_OF_CARDS_TO_RENDER,
            );

            // Отрисуем три карточки
            content.cardList.renderCards(chunk, createCard);

            // Изменим состояние карточек; зависит от 'authState.isLoggedIn'
            content.cardList.cardInstances.forEach((card) => {
              // Вкл./выкл. отображение tooltip
              card.toggleTooltipState({
                isLoggedIn: authState.isLoggedIn,
              });
            });

            // Покажем/скроем кнопку "Показать ещё"
            if (cardsDataToSlice.length !== 0) {
              content.cardList.showMoreResultsButton();
            } else {
              content.cardList.hideMoreResultsButton();
            }
          };

          content.removeLoader();

          // Создадим секцию "Результаты поиска"
          // Передадим обработчик нажатия на кнопку "Показать ещё"
          content.renderResults(processCardsData);

          // Отрисуем первые три карточки
          processCardsData();
        } else {
          content.removeLoader();
          content.renderNoResults();
        }
      } catch (err) {
        content.removeLoader();
        content.renderError();
      } finally {
        searchForm.enableForm();
      }
    }
  },
});

// Обработка открытия страницы
const handlePageOpen = async () => {
  const token = Storage.getToken();

  let userName = '';

  try {
    if (token) {
      authState.isLoggedIn = true;

      const data = await mainApi.getUserData({ token });

      userName = data.data.user.name;
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    header.render({
      isLoggedIn: authState.isLoggedIn,
      userName,
    });

    searchForm.render();
  }
};

// Обработчик события 'storage' в другом окне/вкладке
const handleStorageEvent = async (e) => {
  let userName = '';

  try {
    if (e.key === 'token') {
      if (e.newValue) {
        const token = Storage.getToken();

        authState.isLoggedIn = true;

        const data = await mainApi.getUserData({ token });

        userName = data.data.user.name;
      } else if (!e.newValue) {
        authState.isLoggedIn = false;
      }
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    // Изменим состояние хедера
    header.toggleHeaderState({
      isLoggedIn: authState.isLoggedIn,
      userName,
    });

    // Изменим состояние карточек
    if (content.cardList) {
      content.cardList.cardInstances.forEach((card) => {
        // Сбросим id и bookmark
        if (card.id && !authState.isLoggedIn) {
          card.id = null;
          card.isBookmarkSet = false;
          card.renderBookmark();
        }

        // Вкл./выкл. отображение tooltip
        card.toggleTooltipState({
          isLoggedIn: authState.isLoggedIn,
        });
      });
    }
  }
};

window.addEventListener('storage', handleStorageEvent);

handlePageOpen();
