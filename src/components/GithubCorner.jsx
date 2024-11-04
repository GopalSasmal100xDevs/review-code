import { useState } from "react";

export default function GithubCorner() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  async function getGitHubUsers(name) {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `token ${import.meta.env.VITE_GITHUB_TOKEN}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const res = await fetch(
      `https://api.github.com/search/users?q=${name}`,
      requestOptions
    );
    const data = await res.json();
    setUsers(data.items || []);
  }

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      getGitHubUsers(user);
    }
  }

  return (
    <div className="flex flex-col">
      <input
        value={user}
        onKeyDown={keyEventHandler}
        onChange={(e) => {
          setUser(e.target.value);
          getGitHubUsers(e.target.value);
        }}
        placeholder="GitHub User name"
      />
      <ul>
        {users.map(({ login }, index) => (
          <li
            key={index}
            value={login}
            onClick={() => {
              setUser(login);
              setUsers([]);
            }}
            style={{ cursor: "pointer", padding: "10px" }}
            className=""
          >
            {login}
          </li>
        ))}
      </ul>
    </div>
  );
}
