import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./context/UserContext";
import Header from "./component/Header";
import NavigationBar from "./component/NavigationBar";
import AllArticles from "./component/AllArticles";
import UserBar from "./component/UserBar";
import SingleTopics from "./component/SingleTopic"
import SingleArticle from "./component/SingleArticle";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "jessjelly",
    name: "Jess Jelly",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <div className="App">
          <UserBar />
          <Header />
          <NavigationBar />
          <Routes>
            <Route path="/" element={<AllArticles />} />
            <Route path="/topics/:topic" element={<SingleTopics />}/>
            <Route path="/articles/:article_id" element={<SingleArticle />} />
          </Routes>
          <header className="App-header"></header>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
