import { useState, useEffect } from "react";
import { getCommentsByID } from "../Api";

const Comment = ({ commentCount, article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsByID(article_id).then((articleComments) => {
      setComments(articleComments);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <p>Loading comments for this article...</p>;

  return (
    <>
      <section>
        <h2 className="CommentsCount">Comments: {commentCount}</h2>
      </section>
      <section>
        <ul>
          {comments.map((comment) => {
            return (
              <li className="Comments" key={comment.comment_id}>
                <p className="Comments--date">{comment.created_at.slice(0, 10)}</p>
                <h3>{comment.author}</h3>
                <p >{comment.body}</p>
                <label className="Comments--votes">Votes: {comment.votes}</label>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Comment;
