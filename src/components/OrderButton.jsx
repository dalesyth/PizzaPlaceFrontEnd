import { Link } from "react-router-dom";

const OrderButton = () => {
  return (
    <Link
      to={"/order-page/"}
      
      className="link-button shadow-lg"
    >
      <span className="small-screen-text">Order Online</span>
      <span className="large-screen-text">Click Here to Order Online</span>
    </Link>
  );
}

export default OrderButton