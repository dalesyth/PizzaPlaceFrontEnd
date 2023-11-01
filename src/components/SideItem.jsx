import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../contexts/Cart";

const SideItem = ({ side, quantity, handleQuantity, handleAddSideToCart }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  return (
    <div className="border-black border-2 rounded-lg shadow-lg mb-2 p-2">
      <div className="flex justify-between font-bold text-sm lg:text-base">
        <span>{side.title}</span>
        <span>{side.price}</span>
      </div>

      <div>
        <div className="flex-col">
          <span>
            <div>
              {/* <label className="mr-2 text-xs lg:text-base" htmlFor="quantity">
                Quantity:
              </label>
              <input
                className="w-12 text-center text-xs lg:text-base"
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantity}
              ></input> */}
            </div>
            <div className="text-right">
              {/* <button
                className="bg-blue-400 text-white text-xs lg:text-base font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                onClick={() => handleAddSideToCart(side.side_option_id)}
              >
                Add To Cart
              </button> */}
              <button
                className="bg-blue-400 text-white text-xs lg:text-base font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                onClick={() => addToCart(side)}
              >
                Add To Cart
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

SideItem.propTypes = {
  side: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    side_option_id: PropTypes.number.isRequired,
  }),
  quantity: PropTypes.number.isRequired,
  handleQuantity: PropTypes.func.isRequired,
  handleAddSideToCart: PropTypes.func.isRequired,
};

export default SideItem;
