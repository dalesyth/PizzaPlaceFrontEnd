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
          className="flex shadow-lg p-2 font-bold text-xs lg:text-base bg-blue-500 text-white hover:bg-blue-600"
        >
          <p>Build Your Own Pizza</p>
        </Link>
      </div>
      <div>
        {pizzas.map((pizza, pizzaIndex) => (
          <div key={pizzaIndex}>
            <span>{pizza.pizzaName}</span>
            <span>{pizza.pizzaPrice}</span>
            <div>
              <span>
                Toppings:
                {pizza.toppings.map((topping, toppingIndex) => (
                  <span key={toppingIndex}>{topping.toppingName}</span>
                ))}
              </span>

              <span>Sauce: {pizza.sauceName}</span>
              <span>Crust: {pizza.crustName}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderPage;
