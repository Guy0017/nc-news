const axios = require("axios");

export const getArticles = () => {
  return axios
    .get("https://ncnews-guy.herokuapp.com/api/articles")
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticlesByTopic = (topic) => { 
  return axios
    .get(`https://ncnews-guy.herokuapp.com/api/articles?topic=${topic}`)
    .then(({ data }) => {
      return data.articles;
    });
};
