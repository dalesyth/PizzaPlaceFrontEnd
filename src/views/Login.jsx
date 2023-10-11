import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  console.log(`token is: ${token}`);

  const handleEmail = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(username, password);
      // console.log(`response.message: ${response.message}`);
      // console.log(`response.token: ${response.token}`);
      // console.log(`response.user: ${response.user}`);

      setToken(response.token);
      localStorage.setItem("token", response.token);

      alert(`You are now logged in as ${username}!`);
    } catch (error) {
      console.error(error);
    }

    setUsername("");
    setPassword("");
    localStorage.setItem("username", username);

    console.log(`username in Login: ${username}`);
    const token = localStorage.getItem("token");
    console.log(`token in Login: ${token}`);

    navigate("/Home");
  };

  // console.log(`token is: ${token}`)

  return (
    <div className="Container w-1/2 h-1/2 flex justify-center items-center m-auto mt-10 p-8 bg-gray-100 shadow-lg">
      <div className="login max-w-md w-full">
        <h1 className="text-3xl text-center font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full rounded shadow-lg"
              type="username"
              id="username"
              value={username}
              onChange={handleUsername}
              required
            ></input>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded shadow-lg"
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              required
            ></input>
          </div>
          <div className="mb-4">
            <button
              className="w-full shadow-lg border rounded mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold"
              type="submit"
            >
              SUBMIT
            </button>
            <Link
              to="/register"
              className="underline flex justify-center pt-6 text-blue-600"
            >
              Don't have an account? Click here to register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
