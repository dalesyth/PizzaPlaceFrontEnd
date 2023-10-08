import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 md:p-8 lg:p-16">
        <div className="rounded-lg shadow-md p-4 md:p-8 lg:p-12 border border-black">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Root;
