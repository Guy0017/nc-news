import { useState, useEffect, useContext } from "react";
import {
  getCommentsByID,
  postCommentByID,
} from "../Api";
import { UserContext } from "../context/UserContext";
import Pagination from "./Pagination";
import Vote from "./Vote";
import { checkIsBlank } from "../utils/utils";
import Delete from "./Delete";

const Comment = ({ commentCount, article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addCommentInput, setAddCommentInput] = useState();
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const { loggedInUser } = useContext(UserContext);

  const load = () => {
    setError(false);
    getCommentsByID(article_id, page)
      .then((articleComments) => {
        articleComments.sort((objA, objB) => {
          let compare1 = new Date(objB.created_at);
          let compare2 = new Date(objA.created_at);
          return compare1 - compare2;
        });

        setComments(articleComments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError({ msg: "Connection Error Getting Comments..." });
      });
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    setError(false);

    const isEmpty = checkIsBlank("comment", event.target[0].value);

    if (isEmpty) {
      setError(isEmpty);
      return;
    }

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
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [article_id, page]);

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

                {comment.author === loggedInUser.username ? (
                  <Delete
                    type="comment"
                    id={comment.comment_id}
                    arrayList={comments}
                    setArrayList={setComments}
                    setError={setError}
                  />
                ) : null}

                <Vote
                  type="comment"
                  votes={comment.votes}
                  id={comment.comment_id}
                />
              </li>
            );
          })}
        </ul>
        <Pagination page={page} setPage={setPage} articles={comments} />
      </section>
    </>
  );
};

export default Comment;
