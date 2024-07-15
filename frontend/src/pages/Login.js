import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(emailOrUsername, password);
  };

  return (
    <form
      className="login"
      style={{ position: "absolute", marginTop: "300px", marginLeft: "40vw" }}
      onSubmit={handleSubmit}
    >
      <h3>Log in</h3>

      <label>Email or username:</label>
      <input
        type="emailOrUsername"
        onChange={(e) => setEmailOrUsername(e.target.value)}
        value={emailOrUsername}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
