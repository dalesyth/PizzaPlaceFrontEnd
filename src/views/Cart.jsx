import { useContext } from "react";
import { CartContext } from "../contexts/Cart";
import { Link } from "react-router-dom";


const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  

  

  return (
    <>
      <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="flex flex-col gap-4">
          {cartItems.map((item, itemIndex) => (
            <div className="flex justify-between items-center" key={itemIndex}>
              <div className="flex gap-4">
                <div className="flex flex-col mr-8">
                  <h1 className="text-lg font-bold">{item.title}</h1>
                  <p className="text-gray-600">{item.price}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    removeFromCart(item);
                  }}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 ? (
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => {
                clearCart();
              }}
            >
              Clear cart
            </button>
          </div>
        ) : (
          <h1 className="text-lg font-bold">Your cart is empty</h1>
        )}
        <Link
          to="/order-page"
          className="main-title hover:border-b-4 hover.border-red-500"
        >
          Continue Ordering
        </Link>
      </div>
      <div className="flex justify-center">
        <Link
          className="flex justify-center w-1/4 mt-6 bg-blue-400 text-white text-xs lg:text-base font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
          to="/process-order"
          id="process-order"
        >
          Submit Order
        </Link>
      </div>
    </>
  );
};

export default Cart;
