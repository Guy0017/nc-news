import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UserBar = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <section className="UserBar">
      <label>User: {loggedInUser.name}</label>
      <Link className="changeUserLink" to="/users">
        Change User
      </Link>
      <Link className="postLink" to="/articles/post">
        POST
      </Link>
    </section>
  );
};

export default UserBar;
