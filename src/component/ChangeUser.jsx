import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getUsers } from "../Api";

const ChangeUser = () => {
  const [user, setUser] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((users) => {
      users.sort((personA, personB) => {
        let compare1 = personA.name.toLowerCase();
        let compare2 = personB.name.toLowerCase();

        if (compare1 < compare2) {
          return -1;
        }

        if (compare1 > compare2) {
          return 1;
        }

        return 0;
      });

      const filteredUsers = users.filter((person) => {
        return person.username !== loggedInUser.username;
      });
      setUser(filteredUsers);
      setIsLoading(false);
    });
  }, [loggedInUser]);

  if (isLoading) return <p>Loading users...</p>;

  return (
    <>
      <section className="CurrentUser">
        <h2 className="User--title">Logged In User:</h2>
        <p className="User--name">{loggedInUser.name}</p>
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
                <label>Username:</label>
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
