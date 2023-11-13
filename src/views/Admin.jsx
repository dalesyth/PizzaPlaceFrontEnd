import { Link } from "react-router-dom";



const Admin = () => {
  
  return (
   
    <>
      <div className="bg-gray-500/50 fixed top-0 left-0 w-full h-screen">
        <div className="flex justify-center items-center  py-28">
          <div className="w-6/12 max-w-[450px] h-100 rounded-lg mx-auto bg-gray-200 ">
            <div className="max-w-[320px] mx-auto pt-6">
              <label className="font-bold  text-5xl ">Administration</label>
              <div className="flex flex-col space-x-1 font-bold m-4">
                <ul>
                  <li>
                    <Link to={`/admin/users`}>Manage Users</Link>
                  </li>
                  <li>
                    <Link to={`/admin/orders`}>Manage Orders</Link>
                  </li>
                </ul>

                <Link to="/home" className="no-underline p-6 ">
                  <button
                    type="button"
                    className="w-full h-10 bg-blue-400 text-gray-100 font-bold px-1 py-1 my-6 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                  >
                    Exit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
