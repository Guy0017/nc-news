import { useState } from "react";
import { patchArticleVote, patchCommentVote } from "../Api";

const Vote = ({ type, votes, id }) => {
  const [vote, setVote] = useState(votes);
  const [error, setError] = useState(false);
  const [disableVoteUp, setDisableVoteUp] = useState(false);
  const [disableVoteDown, setDisableVoteDown] = useState(false);
  const errorMsg = {
    status: 400,
    msg: "Error Adding Vote. Please Vote Again...",
  };

  const handleVote = (userVote) => {
    setError(false);
    setDisableVoteDown(false);
    setDisableVoteUp(false);
    setVote(vote + userVote);

    userVote < 0 ? setDisableVoteDown(true) : setDisableVoteUp(true);

    if (type === "comment") {
      patchCommentVote(userVote, id).catch(() => {
        undoOptimisticVote();
      });
    }

    if (type === "article") {
      patchArticleVote(userVote, id).catch(() => {
        undoOptimisticVote();
      });
    }
  };

  const undoOptimisticVote = () => {
    setDisableVoteDown(false);
    setDisableVoteUp(false);
    setError(errorMsg);
    setVote(vote);
  };

  return (
    <>
      <label className="Votes">Votes: {vote}</label>
      <section className="voteButton--container">
        <button
          className="buttonVote"
          disabled={disableVoteUp}
          onClick={() => handleVote(1)}
        >
          VOTE +1
        </button>
        <button
          className="buttonVote"
          disabled={disableVoteDown}
          onClick={() => handleVote(-1)}
        >
          VOTE -1
        </button>
      </section>
      <section>
        {error ? <h2 className="ErrorMsg">{error.msg}</h2> : null}
      </section>
    </>
  );
};

export default Vote;
