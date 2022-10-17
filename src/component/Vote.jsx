import { useState } from "react";
import { patchVote } from "../Api";

const Vote = ({ votes, article_id }) => {
  const [vote, setVote] = useState(votes);
  const [clickedVote, setClickedVote] = useState(false);
  const [error, setError] = useState(false)

  const handleVote = (userVote) => { 
    setError(false)
    if (!clickedVote) {
      setVote((currentVote) => {
        return currentVote + userVote;
      });
      patchVote(userVote, article_id).catch(() => {
        setVote((currentVote) => {
          return currentVote - userVote;
        });
        setClickedVote(false)
        setError({status: 400, msg: "Error Adding Vote. Please Vote Again..."})
      });
      setClickedVote(true);
    }
  }; 

  return (
    <>
      <label className="SingleArticle--votes">Votes: {vote}</label>
      <section>
        <button className="buttonVote" onClick={() => handleVote(1)}>
          VOTE +1
        </button>
        <button className="buttonVote"onClick={() => handleVote(-1)}>VOTE -1</button>
      </section>
      <section>
        {error ? <h2 className="ErrorMsg">{error.msg}</h2> : null}
      </section>
    </>
  );
};

export default Vote;

