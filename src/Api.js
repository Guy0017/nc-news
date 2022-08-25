const axios = require("axios");

export const getArticles = (sortBy, order) => {
  return axios
    .get(
      `https://ncnews-guy.herokuapp.com/api/articles?sortBy=${sortBy}&&order=${order}`
    )
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticlesByTopic = (topic, sortBy, order) => {
  return axios

    .get(
      `https://ncnews-guy.herokuapp.com/api/articles?topic=${topic}&&sortBy=${sortBy}&&order=${order}`
    )
    .then(({ data }) => {
      return data.articles;
    });
};

export const getAllTopics = () => {
  return axios
    .get("https://ncnews-guy.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};

export const getArticleByID = (article_id) => {
  return axios
    .get(`https://ncnews-guy.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.articles[0];
    });
};

export const patchVote = (userVote, article_id) => {
  return axios.patch(
    `https://ncnews-guy.herokuapp.com/api/articles/${article_id}`,
    { inc_votes: userVote }
  );
};

export const getCommentsByID = (article_id) => {
  return axios
    .get(`https://ncnews-guy.herokuapp.com/api/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};
