import PropTypes from 'prop-types';

const PizzaItem = ({ pizza, quantity, handleQuantity, handleAddPizzaToCart }) => {
  return (
    <div
      
      className="border-black border-2 rounded-lg shadow-lg mb-2 p-2"
    >
      <div className="flex justify-between font-bold text-sm lg:text-base">
        <span>{pizza.pizzaName}</span>
        <span>{pizza.pizzaPrice}</span>
      </div>

      <div>
        <div className="text-xs lg:text-base">
          <span className="mr-2">Toppings:</span>
          <p>
            {pizza.toppings.map((topping, toppingIndex) => (
              <span key={toppingIndex}>{topping.toppingName}</span>
            ))}
          </p>
        </div>

        <div className="flex justify-between">
          <span>
            <div className="text-xs lg:text-base">
              <span className="mr-2">Sauce:</span>
              <span>{pizza.sauceName}</span>
            </div>
            <div className="text-xs lg:text-base">
              <span className="mr-2">Crust:</span>
              <span>{pizza.crustName}</span>
            </div>
          </span>
          <span>
            <div>
              <label className="mr-2 text-xs lg:text-base" htmlFor="quantity">
                Quantity:
              </label>
              <input
                className="w-12 text-center text-xs lg:text-base"
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantity}
              ></input>
            </div>
            <div className="text-right">
              <button
                className="bg-blue-400 text-white text-xs lg:text-base font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                onClick={() =>
                  handleAddPizzaToCart({
                    pizzaName: pizza.pizzaName,
                    pizzaPrice: pizza.pizzaPrice,
                    toppingName: pizza.toppings.map(
                      (topping) => topping.toppingName
                    ),
                    toppingId: pizza.toppings.map(
                      (topping) => topping.toppingId
                    ),
                    sauceName: pizza.sauceName,
                    sauceId: pizza.sauceId,
                    crustName: pizza.crustName,
                    crustId: pizza.crustId,
                  })
                }
              >
                Add To Cart
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

PizzaItem.propTypes = {
  pizza: PropTypes.shape({
    pizzaName: PropTypes.string.isRequired,
    sauceName: PropTypes.string.isRequired,
    crustName: PropTypes.string.isRequired,
    pizzaPrice: PropTypes.number.isRequired,
    sauceId: PropTypes.number.isRequired,
    crustId: PropTypes.number.isRequired,
    toppings: PropTypes.arrayOf(
      PropTypes.shape({
        toppingName: PropTypes.string.isRequired,
        toppingId: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
  quantity: PropTypes.number.isRequired,
  handleQuantity: PropTypes.func.isRequired,
  handleAddPizzaToCart: PropTypes.func.isRequired,
};

export default PizzaItem