import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../Api";
import Vote from "./Vote";
import Comment from "./Comment";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticleByID(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

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
        <Vote votes={article.votes} article_id={article_id} />
      </section>
      <Comment commentCount={article.comment_count} article_id={article_id} />
    </>
  );
};

export default SingleArticle;
