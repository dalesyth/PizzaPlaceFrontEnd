import { Link } from "react-router-dom";

const OrderButton = () => {
  return (
    <Link
      to={"/order-page/"}
      //   className="bg-green-400 p-2 rounded-lg text-white font-bold hover:bg-green-600"
      className="link-button shadow-lg"
    >
      <span className="small-screen-text">Order Online</span>
      <span className="large-screen-text">Click Here to Order Online</span>
    </Link>
  );
}

export default OrderButton