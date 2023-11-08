import { useContext } from "react";
import { CartContext } from "../contexts/Cart";
import { Link } from "react-router-dom";
import {
  createNewOrder,
  addPizzaToOrder,
  attachToppingsToOrderedPizza,
  addSideToOrder,
} from "../api/orders";
import useAuth from "../hooks/useAuth";

const ProcessOrder = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  const { auth } = useAuth();

  const handleSubmitOrder = async () => {
    const user_id = auth.userId;

    const cartTotal = await getCartTotal();

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${month}-${day}-${year}`;

    console.log("current date: ", currentDate);

    const userOrder = await createNewOrder({
      user_id,
      order_date: currentDate,
      order_total: cartTotal,
    });

    console.log("cartItems from handleCheckout:", cartItems);

    console.log("cartTotal from handleCheckout:", cartTotal);

    for (const cartItem of cartItems) {
      if (cartItem.pizza_id) {
        try {
          const orderedPizza = await addPizzaToOrder({
            order_id: userOrder.order_id,
            pizza_price: cartItem.price,
            quantity: cartItem.quantity,
            crust: cartItem.crustId,
            sauce: cartItem.sauceId,
          });

          const pizzaId = orderedPizza.ordered_pizza_id;

          if (Array.isArray(cartItem.toppings)) {
            for (const topping of cartItem.toppings) {
              await attachToppingsToOrderedPizza({
                topping_id: topping.toppingId,
                pizza_id: pizzaId,
              });
            }
          } else {
            await attachToppingsToOrderedPizza({
              topping_id: cartItem.toppings,
              pizza_id: pizzaId,
            });
          }
        } catch (error) {
          console.error(error);
        }
      } else if (cartItem.side_option_id) {
        await addSideToOrder({
          sideId: cartItem.side_option_id,
          orderId: userOrder.order_id,
          sidePrice: cartItem.price,
        });
      }
    }

    clearCart();
  };

  return <div>ProcessOrder</div>;
};

export default ProcessOrder;
