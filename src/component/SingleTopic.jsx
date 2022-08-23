import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticlesByTopic } from "../Api";

const SingleTopic = () => {
  const { topic } = useParams();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topic).then((articlesByTopic) => {
      setFilteredArticles(articlesByTopic);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading) return <p>Loading summary of {topic} articles...</p>;

  return (
    <section>
      <h2 className="AllArticles--mainTitle">{`${topic[0].toUpperCase() + topic.slice(1)}`} Articles</h2>
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
              <label>Comments: {article.comment_count}</label>
              <br />
              <label>Date: {article.created_at.slice(0, 10)}</label>
              <br />
              <section className="AllArticles--readLink">
                <Link to={`/articles/${article.article_id}`}>READ</Link>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SingleTopic;
