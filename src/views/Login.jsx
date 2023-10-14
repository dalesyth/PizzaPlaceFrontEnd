import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="w-full max-w-md m-auto shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="username">
              Email
            </label>
            <input
              className="w-full rounded shadow-lg"
              type="username"
              id="username"
              value={email}
              onChange={handleEmail}
              required
            />
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
            />
          </div>
          <div className="mb-4 flex justify-center">
            <button
              className="w-full sm:w-auto shadow-lg border rounded bg-blue-500 hover:bg-blue-600 text-white font-bold lg:px-2"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
          <Link
            to="/register"
            className="text-blue-600 underline block text-center text-sm"
          >
            Don't have an account? Click here to register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;