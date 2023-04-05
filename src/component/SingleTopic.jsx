import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticlesByTopic } from "../Api";
import Pagination from "./Pagination";

const SingleTopic = () => {
  const { topic } = useParams();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState("DESC");
  const [sortBy, setSortBy] = useState("created_at");
  const [submitButton, setSubmitButton] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currTopic, setCurrTopic] = useState(topic);

  const load = () => {
    setError(false);
    setIsLoading(true);

    if (currTopic !== topic) {
      setPage(1);
      setCurrTopic(topic);
    }

    getArticlesByTopic(topic, sortBy, order, page)
      .then((articlesByTopic) => {
        setFilteredArticles(articlesByTopic);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError({ status: err.response.status, msg: err.response.data });
      });
  };

  const handleSort = (event) => {
    event.preventDefault();

    order === "DESC" ? setOrder("ASC") : setOrder("DESC");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSortBy(event.target[0].value);
    setSubmitButton((currentButton) => {
      return !currentButton;
    });
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [submitButton, topic, page]);

  if (error) {
    return (
      <h2 className="ErrorMsg">
        [ERROR: {error.status}] {error.msg.msg}
      </h2>
    );
  }

  if (isLoading) return <p>Loading summary of {topic} articles...</p>;

  return (
    <section>
      <h2 className="AllArticles--mainTitle">
        {`${topic[0].toUpperCase() + topic.slice(1)}`} Articles
      </h2>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label>Sort By: </label>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="created_at">Date</option>
          <option value="author">Author</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>
        <label>Order: </label>
        <button onClick={handleSort}>{order}</button>

        <button>Search</button>
      </form>
      <ul>
        {filteredArticles.map((article) => {
          return (
            <li className="AllArticles" key={article.article_id}>
              <h2 className="title">
                [{article.topic[0].toUpperCase() + article.topic.slice(1)}]
                <label className="AllArticles--date">
                  {article.created_at.slice(0, 10)}
                </label>
                <br />
                {article.title}
              </h2>
              <label>Author: {article.author}</label>
              <br />
              <label>Date: {article.created_at.slice(0, 10)}</label>
              <br />
              <label>Comments: {article.comment_count}</label>
              <br />
              <label>Votes: {article.votes}</label>
              <section>
                <Link
                  to={`/articles/${article.article_id}`}
                  className="linkAndbutton"
                >
                  READ
                </Link>
              </section>
            </li>
          );
        })}
      </ul>
      <Pagination page={page} setPage={setPage} articles={filteredArticles} />
    </section>
  );
};

export default SingleTopic;
