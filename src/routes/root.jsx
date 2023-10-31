import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../views/Header";
import Footer from "../views/Footer";
import { AuthProvider } from "../contexts/AuthProvider";
import { CartProvider } from "../contexts/Cart";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <div className="container mx-auto p-4 md:p-8 lg:p-16">
          <div className="rounded-lg p-4 md:p-8 lg:p-12">
            <Outlet />
          </div>
        </div>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default Root;
