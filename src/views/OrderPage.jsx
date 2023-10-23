import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSpecialtyPizzas } from "../api/specialtypizzas";

const OrderPage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <div key={pizzaIndex} className="bg-green-100 mb-2 p-2">
            <div className="flex justify-between font-bold">
              <span>{pizza.pizzaName}</span>
              <span>{pizza.pizzaPrice}</span>
            </div>

            <div>
              <div>
                <span className="mr-2">Toppings:</span>
                <span>
                  {pizza.toppings.map((topping, toppingIndex) => (
                    <span key={toppingIndex}>{topping.toppingName}</span>
                  ))}
                </span>
              </div>

              <div>
                <span className="mr-2">Sauce:</span>
                <span>{pizza.sauceName}</span>
              </div>
              <div>
                <span className="mr-2">Crust:</span>
                <span>{pizza.crustName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderPage;
