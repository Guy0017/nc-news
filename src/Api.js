const axios = require("axios");
// const hostDomain = "https://ncnews-guy.cyclic.app";
const hostDomain = "http://localhost:9090";

export const getArticles = (sortBy, order, p) => {
  return axios
    .get(`${hostDomain}/api/articles?sortBy=${sortBy}&&order=${order}&&p=${p}`)
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticlesByTopic = (topic, sortBy, order, p) => {
  return axios
    .get(
      `${hostDomain}/api/articles?topic=${topic}&&sortBy=${sortBy}&&order=${order}&&p=${p}`
    )
    .then(({ data }) => {
      return data.articles;
    });
};

export const getAllTopics = () => {
  return axios.get(`${hostDomain}/api/topics`).then(({ data }) => {
    return data.topics;
  });
};

export const getArticleByID = (article_id) => {
  return axios
    .get(`${hostDomain}/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.articles[0];
    });
};

export const patchArticleVote = (userVote, article_id) => {
  return axios.patch(`${hostDomain}/api/articles/${article_id}`, {
    inc_votes: userVote,
  });
};

export const patchCommentVote = (userVote, comment_id) => {
  return axios.patch(`${hostDomain}/api/comments/${comment_id}`, {
    inc_votes: userVote,
  });
};

export const getCommentsByID = (article_id, p) => {
  return axios
    .get(`${hostDomain}/api/articles/${article_id}/comments?p=${p}`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const postCommentByID = (user, addCommentInput, article_id) => {
  return axios.post(`${hostDomain}/api/articles/${article_id}/comments`, {
    username: user,
    body: addCommentInput,
  });
};

export const deleteCommentByCommentID = (comment_id) => {
  return axios.delete(`${hostDomain}/api/comments/${comment_id}`);
};

export const getUsers = () => {
  return axios.get(`${hostDomain}/api/users`).then(({ data }) => {
    return data.users;
  });
};

export const postNewArticle = (author, title, body, topic) => {
  return axios
    .post(`${hostDomain}/api/articles`, { author, title, body, topic })
    .then(({ data }) => {
      return data;
    });
};
