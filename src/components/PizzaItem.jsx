import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../contexts/Cart";

const PizzaItem = ({
  pizza,
  
}) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="border-black border-2 rounded-lg shadow-lg mb-2 p-2">
      <div className="flex justify-between font-bold text-sm lg:text-base">
        <span>{pizza.title}</span>
        <span>${pizza.price}</span>
      </div>

      <div>
        <div className="text-xs lg:text-base w-4/5">
          <span className="toppings-heading">Toppings:</span>
          <span>
            {pizza.toppings.map((topping, toppingIndex) => (
              <span key={toppingIndex}>
                {topping.toppingName}
                {toppingIndex < pizza.toppings.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        </div>

        <div className="flex justify-between">
          <span>
            <div className="text-xs lg:text-base">
              <span className="sauce-heading">Sauce:</span>
              <span>{pizza.sauceName}</span>
            </div>
            <div className="text-xs lg:text-base">
              <span className="crust-heading">Crust:</span>
              <span>{pizza.crustName}</span>
            </div>
          </span>
          <span>
            
            <div className="text-right">
              
              <button
                className="bg-blue-400 text-white text-xs lg:text-base font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                onClick={() => addToCart(pizza)}
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

PizzaItem.propTypes = {
  pizza: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sauceName: PropTypes.string.isRequired,
    crustName: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    sauceId: PropTypes.number.isRequired,
    crustId: PropTypes.number.isRequired,
    toppings: PropTypes.arrayOf(
      PropTypes.shape({
        toppingName: PropTypes.string.isRequired,
        toppingId: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
  
};

export default PizzaItem;
