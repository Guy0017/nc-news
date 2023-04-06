import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../Api";
import Vote from "./Vote";
import Comment from "./Comment";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setIsLoading(true);
    getArticleByID(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ status: err.response.status, msg: err.response.data });
      });
  };

  useEffect(() => {
    load();
  }, [article_id]);

  if (error) {
    return (
      <h2 className="ErrorMsg">
        [ERROR: {error.status}] Article Does Not Exist
      </h2>
    );
  }

  if (isLoading) return <p>Loading selected article...</p>;

  return (
    <>
      <section className="SingleArticle">
        <h2 className="SingleArticle--title">TITLE: {article.title}</h2>
        <br />
        <label className="SingleArticle--date">
          Date: {article.created_at.slice(0, 10)}
        </label>
        <p>{article.body}</p>
        <br />
        <p>
          By <br />
          {article.author}
          <br />
        </p>
        <Vote type="article" votes={article.votes} id={article_id} />
      </section>
      <Comment commentCount={article.comment_count} article_id={article_id} />
    </>
  );
};

export default SingleArticle;
