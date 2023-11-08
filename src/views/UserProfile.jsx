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
    const fetchOrderedPizzasAndSides = async (order) => {
      try {
        const pizzas = await getOrderedPizzaByOrderId(order.order_id);
        const sides = await getOrderedSidesByOrderId(order.order_id);

        return { orderId: order.order_id, pizzas, sides };
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const loadOrderedPizzasAndSides = async () => {
      const promises = orders.map(fetchOrderedPizzasAndSides);

      // Use Promise.all to wait for all the asynchronous calls to complete
      const results = await Promise.all(promises);

      // Filter out any failed results (e.g., where fetching pizzas or sides failed)
      const validResults = results.filter((result) => result !== null);

      // Organize the valid results into an object for easier access
      const orderedPizzasData = {};
      const orderedSidesData = {};

      validResults.forEach(({ orderId, pizzas, sides }) => {
        orderedPizzasData[orderId] = pizzas;
        orderedSidesData[orderId] = sides;
      });

      setOrderedPizzas(orderedPizzasData);
      setOrderedSides(orderedSidesData);
    };

    loadOrderedPizzasAndSides();
  }, [orders]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  console.log("orders from UserProfile:", orders);
  console.log("orderedPizzas from UserProfile:", orderedPizzas);
  console.log("orderedSides from UserProfile:", orderedSides);

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
      <div className="flex justify-between mt-8 bg-gray-200">
        <span className="w-full">
          <p className="flex justify-center font-bold">Previous Orders:</p>
          <div>
            {orders.map((order, index) => (
              <div key={index} className="shadow-lg mb-6 bg-white w-">
                <div>
                  <div>
                    <span className="font-bold">Order Date: </span>
                    <span>{formatDate(order.order_date)}</span>
                  </div>
                  <div>
                    {orderedPizzas[order.order_id] &&
                      orderedPizzas[order.order_id].map(
                        (orderedPizza, pizzaIndex) => (
                          <div key={pizzaIndex}>
                            <h2 className="order-heading">Ordered Pizza:</h2>

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
                                    {toppingIndex <
                                    orderedPizza.ordered_pizza_toppings.length -
                                      1
                                      ? ", "
                                      : ""}
                                  </span>
                                )
                              )}
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
                  <div>
                    {orderedSides[order.order_id] &&
                      orderedSides[order.order_id].map(
                        (orderedSide, sideIndex) => (
                          <div key={sideIndex}>
                            <h2 className="order-heading">Ordered Side:</h2>
                            <p>
                              <span className="font-bold">Name: </span>
                              <span>{orderedSide.side_option_title}</span>
                            </p>

                            <p>
                              <span className="font-bold">Price: </span>
                              <span>{orderedSide.side_option_price}</span>
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
