import { useState, useEffect, useContext } from "react";
import {
  getCommentsByID,
  postCommentByID,
  deleteCommentByCommentID,
} from "../Api";
import { UserContext } from "../context/UserContext";

const Comment = ({ commentCount, article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addCommentInput, setAddCommentInput] = useState();
  const [error, setError] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const handleAddComment = (event) => {
    event.preventDefault();
    setError(false);

    const inputText = event.target[0].value;

    let whiteSpace = 0;

    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === " ") {
        whiteSpace++;
      }
    }

    if (whiteSpace === inputText.length) {
      setError({ status: 400, msg: "Must Type a Message to Post Comment..." });
    } else {
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

      postCommentByID(loggedInUser.username, addCommentInput, article_id).catch(
        () => {
          setComments((currentComments) => {
            const newComments = [...currentComments].filter(
              (comment) => comment.comment_id !== "optimisticRender"
            );
            return newComments;
          });
          setError({
            status: 400,
            msg: "Error Adding Comment. Please Post Comment Again...",
          });
        }
      );
    }
  };

  const handleDeleteComment = (clickedComment) => {
    setError(false);
    setComments((currentComments) => {
      const optimisticComment = [...currentComments].filter(
        (comment) => comment.comment_id !== clickedComment.comment_id
      );
      return optimisticComment;
    });
    deleteCommentByCommentID(clickedComment.comment_id).catch(() => {
      setComments((currentComments) => {
        const reverseDelete = [clickedComment, ...currentComments];

        return reverseDelete;
      });
      setError({
        status: 400,
        msg: "Error Deleting Comment. Please Delete Comment Again...",
      });
    });
  };

  useEffect(() => {
    setError(false);
    getCommentsByID(article_id)
      .then((articleComments) => {
        articleComments.sort((objA, objB) => {
          let compare1 = new Date(objB.created_at);
          let compare2 = new Date(objA.created_at);
          return compare1 - compare2;
        });

        setComments(articleComments);
        setIsLoading(false);
      })
      .catch(() => {
        setError({ msg: "Connection Error Getting Comments..." });
      });
  }, [article_id]);

  if (error) return <h2 className="ErrorMsg">Error: {error.msg}</h2>;

  if (isLoading) return <p>Loading comments for this article...</p>;

  return (
    <>
      <section>
        <h2 className="CommentsCount">Comments: {commentCount}</h2>
      </section>

      <form onSubmit={handleAddComment}>
        <section>
        <p>Write a comment:</p>
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
        </section>
        <button className="addComment--button">Add Comment</button>
        {error ? <h2 className="ErrorMsg">Error: {error.msg}</h2> : null}
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
                {comment.author === loggedInUser.username ? (
                  <button
                    onClick={() => {
                      handleDeleteComment(comment);
                    }} className="linkAndbutton"
                  >
                    Delete
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Comment;
