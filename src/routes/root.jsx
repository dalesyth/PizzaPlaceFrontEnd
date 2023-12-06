import { Outlet, useNavigate } from "react-router-dom";
import { createRoot, useEffect } from "react";
import Header from "../views/Header";
import Footer from "../views/Footer";
import { AuthProvider } from "../contexts/AuthProvider";
import { CartProvider } from "../contexts/Cart";
import StaticDataProvider from "../contexts/StaticDataProvider";
import CloseWindowHandler from "../components/CloseWindowHandler";
import Logout from "../views/Logout";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  const handleWindowClose = () => {
    const root = createRoot(document.getElementById("root"));
    root.render(<Logout />);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <StaticDataProvider>
          <CloseWindowHandler onWindowClose={{ handleWindowClose }} />
          <Header />
          <div className="container mx-auto p-4 md:p-8 lg:p-16">
            <div className="rounded-lg p-4 md:p-8 lg:p-12">
              <Outlet />
            </div>
          </div>
          <Footer />
        </StaticDataProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default Root;
