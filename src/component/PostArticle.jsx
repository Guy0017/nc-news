import { useContext, useEffect, useState } from "react";
import { addNewTopic, getAllTopics, postNewArticle } from "../Api";
import { UserContext } from "../context/UserContext";
import { checkIsBlank } from "../utils/utils";

const PostArticle = () => {
  const { loggedInUser } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const author = loggedInUser.username;
  const topic = selectedTopic === "newTopic" ? slug : selectedTopic;

  const load = () => {
    getAllTopics()
      .then((allTopics) => {
        setTopics(allTopics);
      })
      .catch(() => {
        setError({ msg: "Connection Error Please Reload" });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSubmitted(false);

    if (!selectedTopic) {
      return setError({ msg: "Please Select Topic" });
    }

    const isEmptyTitle = checkIsBlank("title", title);
    const isEmptyBody = checkIsBlank("article", body);

    if (isEmptyTitle && isEmptyBody) {
      setError({ status: 400, msg: "Must Type Title and Article to Post..." });
      return;
    }

    if (isEmptyTitle || isEmptyBody) {
      isEmptyTitle ? setError(isEmptyTitle) : setError(isEmptyBody);
      return;
    }

    if (selectedTopic === "newTopic") {
      addNewTopic(slug, description).then(() => {
        postNewArticle(author, title, body, topic)
          .then(() => {
            setSubmitted(true);
            clearForm();
          })
          .catch((error) => {
            if (error.message === "Network Error") {
              setError({
                msg: error.message,
              });
            }

            setError({
              msg: `Status ${error.response.status}: ${error.response.data.msg}`,
            });
          });
      });
    } else {
      postNewArticle(author, title, body, topic)
        .then(() => {
          setSubmitted(true);
          clearForm();
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            setError({
              msg: error.message,
            });
          }

          setError({
            msg: `Status ${error.response.status}: ${error.response.data.msg}`,
          });
        });
    }
  };

  const clearForm = () => {
    setTitle("");
    setSelectedTopic("");
    setBody("");
    setSlug("");
    setDescription("");
  };

  useEffect(() => {
    load();
  }, []);

  if (error && topics.length === 0) {
    return <h2 className="ErrorMsg">{error.msg}</h2>;
  }

  return (
    <div>
      <h2 className="AllArticles--mainTitle">Post Your Article</h2>

      {!submitted ? (
        <div className="postContainer">
          <form
            className="postArticle"
            onSubmit={(event) => handleSubmit(event)}
          >
            <label>Title: </label> <br />
            <input
              id="Title"
              type="text"
              value={title}
              placeholder="Enter your title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <label>Topic: </label> <br />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="" key="" hidden required></option>
              {topics.map((topic) => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug[0].toUpperCase().concat(topic.slug.slice(1))}
                  </option>
                );
              })}
              <option key="newTopic" value="newTopic">
                Other
              </option>
            </select>
            {error ? <p className="ErrorMsg"> {error.msg} </p> : null}
            {selectedTopic === "newTopic" ? (
              <>
                {" "}
                <br />
                <br />
                <label>New Topic Name: </label> <br />
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                ></input>
                <br />
                <br />
                <label>New Topic Description: </label> <br />
                <textarea
                  value={description}
                  cols="45"
                  rows="5"
                  placeholder="Enter new topic description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </>
            ) : null}
            <br />
            <br />
            <label>Article: </label> <br />
            <textarea
              value={body}
              cols="45"
              rows="15"
              placeholder="Enter your details"
              required
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <br />
            <br />
            <button className="postArticle--button">Submit</button>
          </form>
        </div>
      ) : (
        <>
          <h2>Your Article Has Been Submitted</h2>

          <button
            onClick={() => setSubmitted(false)}
            className="postArticle--button2"
          >
            Another Post
          </button>
        </>
      )}
    </div>
  );
};

export default PostArticle;
