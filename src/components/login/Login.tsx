import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createUserRequest } from "../../app/userAPI";
import { login } from "../../app/userSlice";
import "./Login.css";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);

  const dispatch = useAppDispatch();

  (document as any).createUser = () => {
    setShowCreateUser(true);
  };

  return (
    <div className="wrapper">
      <h1>Welcome</h1>
      <h3>Please log in below</h3>
      <div className="login-window">
        Username
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
        Password
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div
          className="login-button"
          onClick={() => dispatch(login({ username, password }))}
        >
          Login
        </div>
        {showCreateUser && (
          <div
            className="login-button"
            onClick={() => createUserRequest({ username, password })}
          >
            Create User
          </div>
        )}
      </div>
    </div>
  );
}
