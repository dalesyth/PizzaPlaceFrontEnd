import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrderByUserId, getOrderedPizzaByOrderId } from "../api/orders";
import { getOrderedSidesByOrderId } from "../api/sides";
import useAuth from "../hooks/useAuth";

const UserProfile = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [orderedPizzas, setOrderedPizzas] = useState({});
  const [orderedSides, setOrderedSides] = useState({});

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const userOrders = await getOrderByUserId(auth.userId);
        setOrders(userOrders);
      } catch (error) {
        console.error(error);
      }
    };
    getUserOrders();
  }, [auth.userId]);

  useEffect(() => {
    const getOrderedPizzasAndSides = async (order) => {
      try {
        const pizzas = await getOrderedPizzaByOrderId(order.order_id);
        const sides = await getOrderedSidesByOrderId(order.order_id);

        // Here, we're using order.order_id as the key to store ordered pizzas and sides
        setOrderedPizzas({ ...orderedPizzas, [order.order_id]: pizzas });
        setOrderedSides({ ...orderedSides, [order.order_id]: sides });
      } catch (error) {
        console.error(error);
      }
    };

    // Make sure to iterate over the orders array correctly
    orders.forEach((order) => {
      getOrderedPizzasAndSides(order);
    });
  }, [orders]);

  console.log("orders from UserProfile:", orders)
  console.log("orderedPizzas from UserProfile:", orderedPizzas)
  console.log("orderedSides from UserProfile:", orderedSides)

  return (
    <>
      <p className="flex justify-center font-bold text-4xl">UserProfile</p>
      <div className="flex justify-between mt-8 shadow-lg">
        <span>
          <p className="font-bold">Your Information:</p>
          <p>
            {auth.firstName} {auth.lastName}
          </p>
          <p>{auth.email}</p>
        </span>
        <span>
          <Link
            className="bg-blue-400 text-white text-xs lg:text-base font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
            to="/logout"
            id="logout"
          >
            Logout
          </Link>
        </span>
      </div>
      <div className="flex justify-between mt-8 shadow-lg">
        <span>
          <p className="font-bold">Previous Orders:</p>
          <div>
            {orders.map((order, index) => (
              <div key={index}>
                <div>
                  <h2>Ordered Pizzas:</h2>
                  <div>
                    {orderedPizzas[order.order_id] &&
                      orderedPizzas[order.order_id].map(
                        (orderedPizza, pizzaIndex) => (
                          <div key={pizzaIndex}>
                            <div>
                              <span>Order Date: </span>
                              <span>{order.order_date}</span>
                            </div>
                            <p>
                              <span className="font-bold">Price: </span>
                              <span>{orderedPizza.ordered_pizza_price}</span>
                            </p>
                            <p>
                              <span className="font-bold">Toppings: </span>{" "}
                              {orderedPizza.ordered_pizza_toppings.map(
                                (topping, toppingIndex) => (
                                  <span key={toppingIndex}>
                                    {topping.title}
                                    {toppingIndex < orderedPizza.ordered_pizza_toppings.length - 1
                                      ? ", "
                                      : ""}
                                  </span>
                                )
                              )}
                              <span>{orderedPizza.ordered_pizza_topping}</span>
                            </p>
                            <p>
                              <span className="font-bold">Crust: </span>
                              <span>{orderedPizza.ordered_pizza_crust}</span>
                            </p>
                            <p>
                              <span className="font-bold">Sauce: </span>
                              <span>{orderedPizza.ordered_pizza_sauce}</span>
                            </p>
                          </div>
                        )
                      )}
                  </div>
                </div>
                <div>
                  <h2>Ordered Sides:</h2>
                  <div>
                    {orderedSides[order.order_id] &&
                      orderedSides[order.order_id].map(
                        (orderedSide, sideIndex) => (
                          <div key={sideIndex}>
                            <p>
                              <span className="font-bold">Name: </span>
                              <span>{orderedSide.side_name}</span>
                            </p>
                            <p>
                              <span className="font-bold">Quantity: </span>
                              <span>{orderedSide.quantity}</span>
                            </p>
                            <p>
                              <span className="font-bold">Price: </span>
                              <span>{orderedSide.side_price}</span>
                            </p>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </span>
      </div>
    </>
  );
};

export default UserProfile;
