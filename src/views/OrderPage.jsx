import { Link } from 'react-router-dom'

const OrderPage = () => {
  return (
    <>
      <div>
        <Link
          to="/build-pizza"
          className="flex shadow-lg p-2 font-bold text-xs lg:text-base bg-blue-500 text-white hover:bg-blue-600"
        >
          <p>Build Your Own Pizza</p>
        </Link>
      </div>
      
    </>
  );
}

export default OrderPage