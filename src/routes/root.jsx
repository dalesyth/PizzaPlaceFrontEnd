import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
