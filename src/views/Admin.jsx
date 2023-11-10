import { Link } from "react-router-dom";
import Users from "../admin/Users";
import Orders from "../admin/Orders";

const Admin = () => {
  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      <Users />
      <Orders />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
