import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getUsers } from "../Api";

const ChangeUser = () => {
  const [user, setUser] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().then((users) => {
      setUser(users);
      setIsLoading(false);
    });
  }, [loggedInUser]);

  return (
    <>
      <section className="CurrentUser">
        <h2 className="User--title">Logged In User:</h2>
        <p>{loggedInUser.name}</p>
        <p>Username: {loggedInUser.username}</p>
        <img className="User--img" src={loggedInUser.avatar_url}></img>
        <br />
      </section>
      <section>
        <br />
        <h2 className="User--title">Change User Login:</h2>
        <ul>
          {user.map((person) => {
            return (
              <li key={person.username} className="User">
                <label className="User--name">{person.name}</label>
                <br />
                <br />
                <img
                  className="Image"
                  alt={person.name}
                  src={person.avatar_url}
                ></img>
                <br />
                <br />
                <label>{person.username}</label>
                <br />
                <br />
                <button
                  onClick={() => {
                    setLoggedInUser(person);
                  }}
                >
                  Login
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default ChangeUser;
