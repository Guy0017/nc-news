const axios = require("axios");

export const getArticles = (sortBy, order) => {
  return axios
    .get(
      `https://ncnews-guy.herokuapp.com/api/articles?sortBy=${sortBy}&&order=${order}`
    )
    .then(({ data }) => {
      return data.articles;
    })
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

export const postCommentByID = (user, addCommentInput, article_id) => {
  return axios.post(
    `https://ncnews-guy.herokuapp.com/api/articles/${article_id}/comments`,
    { username: user, body: addCommentInput }
  );
};

export const deleteCommentByCommentID = (comment_id) => {
  return axios.delete(
    `https://ncnews-guy.herokuapp.com/api/comments/${comment_id}`
  );
};

export const getUsers = () => {
  return axios
    .get("https://ncnews-guy.herokuapp.com/api/users")
    .then(({ data }) => {
      return data.users;
    });
};
