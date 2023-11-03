import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <>
      <div>UserProfile</div>
      <li>
        <Link to="/logout" id="logout">
          Logout
        </Link>
      </li>
    </>
  ); 

  
};

export default UserProfile;
