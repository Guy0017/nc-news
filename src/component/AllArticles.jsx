import { useState, useEffect } from "react";
import { getArticles } from "../Api";
import { Link } from "react-router-dom";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((allArticles) => {
      setArticles(allArticles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading summary of all articles...</p>;

  return (
    <section>
      <h2 className="AllArticles--mainTitle">Articles</h2>
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
              <label>Comments: {article.comment_count}</label>
              <br />
              <label>Date: {article.created_at.slice(0, 10)}</label>
              <br />
              <section className="AllArticles--readLink">
                <Link to="">READ</Link>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AllArticles;
