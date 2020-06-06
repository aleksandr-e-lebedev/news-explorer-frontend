import MainApi from '../../js/api/MainApi';

import Overlay from '../../blocks/overlay/Overlay';
import Button from '../../blocks/button/Button';
import Header from '../../blocks/header/Header';
import Summary from '../../blocks/summary/Summary';
import Content from '../../blocks/content/Content';
import Loading from '../../blocks/loading/Loading';
import NoResults from '../../blocks/no-results/NoResults';
import RequestError from '../../blocks/request-error/RequestError';
import CardList from '../../blocks/card-list/CardList';
import Card from '../../blocks/card/Card';

import Storage from '../../js/modules/Storage';

import togglePageScroll from '../../js/utils/togglePageScroll';
import getRankedKeywords from '../../js/utils/getRankedKeywords';

import config from '../../js/constants/config';
import selectors from '../../js/constants/selectors';
import styles from '../../js/constants/styles';

import './index.css';

const mainApi = new MainApi({
  baseUrl: config.MAIN_API_BASEURL,
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
      content.cardList.remove();
      content.cardList = null;
    }
  },
});

// Рендеринг страницы после получения данных с MainApi
const renderPage = async (token) => {
  try {
    content.renderLoader();

    const [userData, articlesData] = await mainApi.getAppData({ token });

    const header = new Header({
      selector: selectors.header,
      dependencies: {
        overlay: Overlay,
        button: Button,
      },
      backgroundColor: styles.header.backgroundColor.white,
      handleLogoutButtonClick: () => {
        Storage.removeToken();
        window.location.replace(config.APP_BASEURL);
      },
      togglePageScroll,
    });

    const summary = new Summary({
      selector: selectors.summary,
    });

    header.render({
      isLoggedIn: true,
      userName: userData.data.user.name,
    });

    summary.render({
      userName: userData.data.user.name,
      articlesCount: articlesData.results,
      rankedKeywords: getRankedKeywords(articlesData.data.articles),
    });

    if (articlesData.results !== 0) {
      // Получим массив карточек из данных с MainApi
      const cardsDataToSlice = articlesData.data.articles;

      // Будем использовать cardsData как копию данных карточек, чтобы рендерить keywords
      let cardsData = [...articlesData.data.articles];
      let articlesCount = articlesData.results;

      // Колбэк - Обработка массива данных карточек
      const processCardsData = () => {
        // Будем нарезать массив карточек по три, начиная с последних добавленных
        const chunk = cardsDataToSlice.splice(
          config.INDEX_OF_THE_CARD_WITH_WHICH_TO_START_SLICING,
          config.NUMBER_OF_CARDS_TO_RENDER,
        ).reverse();

        const renderMoreResultsButton = () => {
          if (cardsDataToSlice.length !== 0) {
            content.cardList.showMoreResultsButton();
          } else {
            content.cardList.hideMoreResultsButton();
          }
        };

        // Колбэк - Создание карточки
        const createCard = (cardData) => {
          const card = new Card({
            selector: selectors.card,
            dependencies: {
              button: Button,
            },
            template: selectors.cardTemplate,
            ...cardData,
            handleTrashClick: async () => {
              try {
                const { id } = card;

                await mainApi.removeArticle({ token, id });

                // Удаляем карточку из разметки
                card.remove();

                // Рендерим обновленное количество сохранённых статей
                articlesCount -= 1;
                summary.setArticlesCounter(articlesCount);

                // Рендерим обновленные ключевые слова
                cardsData = cardsData.filter((article) => article._id !== card.id);
                summary.setKeywords(getRankedKeywords(cardsData));

                if (articlesCount !== 0) {
                  if (cardsDataToSlice.length !== 0) {
                    // Отрисуем следующую карточку, чтобы в линии снова было 3 карточки
                    content.cardList.renderCards([cardsDataToSlice.pop()], createCard);

                    // Покажем/скроем кнопку "Показать ещё"
                    renderMoreResultsButton();
                  }
                } else {
                  content.removeResults();
                }
              } catch (err) {
                console.log(err.message);
              }
            },
          });

          return {
            cardElement: card.render(),
            cardInstance: card,
          };
        };

        // Отрисуем три карточки
        content.cardList.renderCards(chunk, createCard);

        // Покажем/скроем кнопку "Показать ещё"
        renderMoreResultsButton();
      };

      content.removeLoader();

      // Создадим секцию c карточками
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
  }
};

// Обработка открытия страницы
const handlePageOpen = () => {
  const token = Storage.getToken();

  if (token) {
    renderPage(token);
  } else {
    window.location.replace(config.APP_BASEURL);
  }
};

// Обработчик события 'storage' в другом окне/вкладке
const handleStorageEvent = (e) => {
  if (e.key === 'token' && !e.newValue) {
    window.location.replace(config.APP_BASEURL);
  }
};

window.addEventListener('storage', handleStorageEvent);

handlePageOpen();
