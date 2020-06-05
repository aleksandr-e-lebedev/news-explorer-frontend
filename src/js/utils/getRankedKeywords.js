export default (articles) => {
  const keywords = articles.map((article) => article.keyword);

  const keywordRank = keywords.reduce((keywordRank, keyword) => {
    keywordRank[keyword] = keywordRank[keyword] ? keywordRank[keyword] + 1 : 1;

    return keywordRank;
  }, {});

  const rankedKeywordEntries = Object.entries(keywordRank).sort((a, b) => b[1] - a[1]);
  const rankedKeywords = rankedKeywordEntries.map((entry) => entry[0]);
  const totalKeywordCount = rankedKeywords.length;

  let data = {};

  if (totalKeywordCount === 1) {
    const [firstKeyword] = rankedKeywords;

    data = {
      totalKeywordCount,
      firstKeyword,
    };
  }

  if (totalKeywordCount === 2) {
    const [firstKeyword, secondKeyword] = rankedKeywords;

    data = {
      totalKeywordCount,
      firstKeyword,
      secondKeyword,
    };
  }

  if (totalKeywordCount === 3) {
    const [firstKeyword, secondKeyword, thirdKeyword] = rankedKeywords;

    data = {
      totalKeywordCount,
      firstKeyword,
      secondKeyword,
      thirdKeyword,
    };
  }

  if (totalKeywordCount >= 4) {
    const [firstKeyword, secondKeyword, ...otherKeyword] = rankedKeywords;

    data = {
      totalKeywordCount,
      firstKeyword,
      secondKeyword,
      otherKeywordCount: otherKeyword.length,
    };
  }

  return data;
};
