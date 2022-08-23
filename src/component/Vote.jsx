import { useState } from "react";
import { patchVote } from "../Api";

const Vote = ({ votes, article_id }) => {
  const [vote, setVote] = useState(votes);
  const handleVote = (userVote) => {
    setVote((currentVote) => {
      return currentVote + userVote;
    });

    patchVote(userVote, article_id).catch(() => {
      setVote((currentVote) => {
        return currentVote - userVote;
      });
    });
  };

  return (
    <>
      <label className="SingleArticle--votes">Votes: {vote}</label>
      <section>
        <button className="buttonVote" onClick={() => handleVote(1)}>
          VOTE +1
        </button>
        <button onClick={() => handleVote(-1)}>VOTE -1</button>
      </section>
    </>
  );
};

export default Vote;
