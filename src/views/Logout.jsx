import { useEffect } from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    console.log("Logout useEffect reached");
    localStorage.clear();
  }, []);

  return (
    <>
      <div className="bg-gray-500/50 fixed top-0 left-0 w-full h-screen">
        <div className="flex justify-center items-center py-24">
          <div className="mx-auto max-w-[450px] h-100 rounded-lg bg-gray-200">
            <div className="font-bold max-w-[320px] mx-auto py-6 px-3">
              <div className="text-center">
                <label className="text-3xl">You have been logged out!</label>
              </div>
              <div>
                <br />
                <Link to={`/home`} className="hover:text-blue-600">
                  Home
                </Link>
                <Link
                  to={`/register`}
                  className="float-right hover:text-blue-600"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
