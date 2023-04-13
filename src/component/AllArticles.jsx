import { useState, useEffect, useContext } from "react";
import { getArticles } from "../Api";
import { Link } from "react-router-dom";
import Delete from "./Delete";
import Pagination from "./Pagination";
import { UserContext } from "../context/UserContext";

const AllArticles = () => {
  const { loggedInUser } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState("DESC");
  const [sortBy, setSortBy] = useState("created_at");
  const [submitButton, setSubmitButton] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const load = () => {
    setError(false);
    setIsLoading(true);

    getArticles(sortBy, order, page)
      .then((allArticles) => {
        setArticles(allArticles);
        setIsLoading(false);
      })
      .catch(() => {
        setError({ msg: "Connection Error Getting Articles..." });
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
  }, [submitButton, page]);

  if (error) {
    return <h2 className="ErrorMsg">Error: {error.msg}</h2>;
  }

  if (isLoading) return <p>Loading summary of all articles...</p>;

  return (
    <section>
      <h2 className="AllArticles--mainTitle">Articles</h2>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label>Sort By: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Date</option>
          <option value="author">Author</option>
          <option value="votes">Votes</option>
          <option value="topic">Topic</option>
          <option value="comment_count">Comments</option>
        </select>
        <label>Order: </label>
        <button onClick={handleSort}>{order}</button>

        <button>Search</button>
      </form>

      <ul>
        {articles.map((article) => {
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
                {article.author === loggedInUser.username ? (
                  <Delete
                    type="article"
                    id={article.article_id}
                    arrayList={articles}
                    setArrayList={setArticles}
                    setError={setError}
                  />
                ) : null}
              </section>
            </li>
          );
        })}
      </ul>
      <Pagination page={page} setPage={setPage} articles={articles} />
    </section>
  );
};

export default AllArticles;
