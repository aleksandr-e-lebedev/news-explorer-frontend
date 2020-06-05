export default (data, keyword) => {
  const cardsData = data.articles.map((article) => {
    const card = {};

    const formatDate = (dateToFormat) => {
      if (typeof dateToFormat !== 'string') {
        return undefined;
      }

      const ruMonths = {
        0: 'января',
        1: 'февраля',
        2: 'марта',
        3: 'апреля',
        4: 'мая',
        5: 'июня',
        6: 'июля',
        7: 'августа',
        8: 'сентября',
        9: 'октября',
        10: 'ноября',
        11: 'декабря',
      };

      const date = new Date(dateToFormat);

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      return `${day} ${ruMonths[month]}, ${year}`;
    };

    card.keyword = keyword;
    card.link = article.url;
    card.image = article.urlToImage;
    card.date = formatDate(article.publishedAt);
    card.title = article.title;
    card.text = article.description;
    card.source = article.source.name;

    return card;
  });

  return cardsData;
};
