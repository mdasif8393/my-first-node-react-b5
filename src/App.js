import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleSendData = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
      });
  };
  return (
    <div className="App">
      <ul>
        {users.map((user) => (
          <li>
            ID: {user.id} Name: {user.name} Number: {user.number} {user.phone}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendData}>
        <input type="text" name="name"></input>
        <input type="email" name="email" id="" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
