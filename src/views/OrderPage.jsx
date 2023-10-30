import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSpecialtyPizzas } from "../api/specialtypizzas";
import { getAllSides } from "../api/sides";
import {
  getOrderByUserId,
  createNewOrder,
  addPizzaToOrder,
  attachToppingsToOrderedPizza,
  addSideToOrder,
} from "../api/orders";

import PizzaItem from "../components/PizzaItem";
import SideItem from "../components/SideItem";

import useAuth from "../hooks/useAuth";
import { useFetchData } from "../hooks/useFetchData";

const OrderPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { data: pizzas, isLoading: isLoadingPizzas } = useFetchData(
    getAllSpecialtyPizzas
  );
  const { data: sides, isLoading: isLoadingSides } = useFetchData(getAllSides);

  console.log("pizzas:", pizzas);
  console.log("sides:", sides);

  const { auth } = useAuth();

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddPizzaToCart = async (pizzaData) => {
    const { pizzaPrice, toppingId, sauceId, crustId } = pizzaData;

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

  const handleAddSideToCart = async (side_option_id) => {
    try {
      const user_id = auth.userId;

      const [userOrder] = await getOrderByUserId(user_id);

      if (!userOrder || userOrder.length === 0 || userOrder.order_complete) {
        await createNewOrder({
          user_id,
        });
      }

      await addSideToOrder({
        sideId: side_option_id,
        orderId: userOrder.order_id,
      });
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
          <PizzaItem
            key={pizzaIndex}
            pizza={pizza}
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleAddPizzaToCart={handleAddPizzaToCart}
          />
        ))}
        <p className="sides-heading">Sides</p>
        {sides.map((side, index) => (
          <SideItem
            key={index}
            side={side}
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleAddSideToCart={handleAddSideToCart}
          />
        ))}
      </div>
    </>
  );
};

export default OrderPage;
