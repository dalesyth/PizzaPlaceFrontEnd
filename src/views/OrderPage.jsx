import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSpecialtyPizzas } from "../api/specialtypizzas";
import useAuth from "../hooks/useAuth";

const OrderPage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { auth } = useAuth()

  
  

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const response = await getAllSpecialtyPizzas();

        setPizzas(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getPizzas();
  }, []);

 

 

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = async () => {
    const email = auth.email
    console.log("email from handleAddToCart: ", email)
  }

  return (
    <>
      <div>
        <Link
          to="/build-pizza"
          className="flex shadow-lg p-2 font-bold text-xs lg:text-base bg-blue-500 text-white hover:bg-blue-600 mb-2"
        >
          <p>Build Your Own Pizza</p>
        </Link>
      </div>
      <div>
        {pizzas.map((pizza, pizzaIndex) => (
          <div
            key={pizzaIndex}
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
                      onClick={handleAddToCart}
                    >
                      Add To Cart
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderPage;
