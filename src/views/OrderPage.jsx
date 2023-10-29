import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSpecialtyPizzas } from "../api/specialtypizzas";
import { getAllSides } from "../api/sides";
import {
  getOrderByUserId,
  createNewOrder,
  addPizzaToOrder,
  attachToppingsToOrderedPizza,
} from "../api/orders";

import useAuth from "../hooks/useAuth";

const OrderPage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [sides, setSides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { auth } = useAuth();

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const _pizzas = await getAllSpecialtyPizzas();
        const _sides = await getAllSides();

        setPizzas(_pizzas);
        setSides(_sides);
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

  const handleAddPizzaToCart = async (pizzaData) => {
    const {
      pizzaPrice,
      toppingId,
      sauceId,
      crustId,
    } = pizzaData;

    try {
      const user_id = auth.userId;

      const [userOrder] = await getOrderByUserId(user_id);

      if (!userOrder || userOrder.length === 0 || userOrder.order_complete) {
        await createNewOrder({
          user_id,
        });
      }

      const orderedPizza = await addPizzaToOrder({
        order_id: userOrder.order_id,
        pizza_price: pizzaPrice,
        quantity: quantity,
        crust: crustId,
        sauce: sauceId,
      });

      const pizzaId = orderedPizza.ordered_pizza_id;

      await attachToppingsToOrderedPizza({
        topping_id: toppingId,
        pizza_id: pizzaId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSideToCart = async () => {
    console.log("sides from handleAddSideToCart:", sides)
    try {
      const user_id = auth.userId;

      const [userOrder] = await getOrderByUserId(user_id);

      if (!userOrder || userOrder.length === 0 || userOrder.order_complete) {
        await createNewOrder({
          user_id,
        });
      }

      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <p className="pizzas-heading">Pizzas</p>
      <div className="flex justify-center">
        <Link to="/build-pizza" className="link-button mb-2">
          Build Your Own Pizza
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
                    <label
                      className="mr-2 text-xs lg:text-base"
                      htmlFor="quantity"
                    >
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
        ))}
        <p className="sides-heading">Sides</p>
        {sides.map((side, index) => (
          <div
            key={index}
            className="border-black border-2 rounded-lg shadow-lg mb-2 p-2"
          >
            <div className="flex justify-between font-bold text-sm lg:text-base">
              <span>{side.title}</span>
              <span>{side.price}</span>
            </div>

            <div>
              <div className="flex justify-between">
                <span>
                  <div>
                    <label
                      className="mr-2 text-xs lg:text-base"
                      htmlFor="quantity"
                    >
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
                      onClick={handleAddSideToCart}
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
