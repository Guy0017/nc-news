import { useState, useEffect, useContext } from "react";
import { getCommentsByID, patchCommentByID } from "../Api";
import { UserContext } from "../context/UserContext";

const Comment = ({ commentCount, article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addCommentInput, setAddCommentInput] = useState();
  const { loggedInUser } = useContext(UserContext);

  const handleAddComment = (event) => {
    event.preventDefault();

    setComments((currentComments) => {
      const date = new Date();

      let month = date.getMonth().toString();
      let day = date.getDate().toString();

      if (month.length < 2) {
        month = "0" + month;
      }

      if (day.length < 2) {
        day = "0" + day;
      }

      const today = `${date.getFullYear()}-${month}-${day}`;

      const userComment = {
        comment_id: "optimisticRender",
        article_id: article_id,
        author: loggedInUser.username,
        body: addCommentInput,
        created_at: today,
        votes: 0,
      };

      return [userComment, ...currentComments];
    });
    patchCommentByID(loggedInUser.username, addCommentInput, article_id).catch(() => {
      setComments((currentComments) => {
        const newComments = [...currentComments].filter(
          (comment) => comment.comment_id !== "optimisticRender"
        );
        return newComments;
      });
      alert("Error adding comment. Please post comment again...");
    });
  };

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

      <form onSubmit={handleAddComment}>
        <label>Write a comment:</label>
        <textarea
          value={addCommentInput}
          onChange={(event) => {
            setAddCommentInput(event.target.value);
          }}
          className="addComment"
          name="addComment"
          id="addComment"
          cols="45"
          rows="13"
          placeholder="Write comment here..."
          required
        ></textarea>
        <button className="addComment--button">Add Comment</button>
      </form>

      <section>
        <ul>
          {comments.map((comment) => {
            return (
              <li className="Comments" key={comment.comment_id}>
                <p className="Comments--date">
                  {comment.created_at.slice(0, 10)}
                </p>
                <h3>{comment.author}</h3>
                <p>{comment.body}</p>
                <label className="Comments--votes">
                  Votes: {comment.votes}
                </label>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Comment;
