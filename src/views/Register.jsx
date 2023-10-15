import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import React from "react";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
    console.log(firstName);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
    console.log(lastName);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handlePassword = (event => {
    setPassword(event.target.value);
    console.log(password);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!email || !password) {
        setError("Please fill out all fields!")
    }

    if (password.length < 8) {
        setError("Password must be at least 8 characters!")
    }

    try {
        
    } catch (error) {
        console.error;
        setError(error);
    }
  }

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="bg-gray-200 w-5/12 px-5 rounded-lg shadow-lg">
          <div>
            <div className="border">
              <label className="font-bold text-xl pb-2 py-4 flex justify-center">
                Register:
              </label>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
              <form className="w-full flex m-2 flex-col py-2">
                <label className="font-bold">First Name</label>
                <input
                  className="m-2"
                  type="text"
                  required
                  placeholder="Firstname*"
                  onChange={handleFirstName}
                />
                <label className="font-bold">Last Name</label>
                <input
                  className="m-2"
                  type="text"
                  required
                  placeholder="Lastname*"
                  onChange={handleLastName}
                />

                <label className="font-bold">Email</label>
                <input
                  className="m-2"
                  type="text"
                  required
                  placeholder="Email*"
                  onChange={handleEmail}
                ></input>

                <label className="font-bold">Password</label>
                <input
                  className="m-2"
                  type="password"
                  required
                  placeholder="Password*"
                  onChange={handlePassword}
                ></input>

                <button
                  className="bg-blue-400 flex justify-center text-gray-100 font-bold p-1.5 m-1 rounded-lg hover:bg-blue-600"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <button className="flex justify-center bg-gray-300 rounded-lg font-bold p-1.5 m-1 hover:bg-gray-400">
                  <Link to={`/home`}>Cancel</Link>
                </button>
              </form>
              {error && <p className="text-red-500">{setError}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
