import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrderByUserId, getOrderedPizzaByOrderId } from "../api/orders";
import { getOrderedSidesByOrderId } from "../api/sides";

import PizzaItem from "../components/PizzaItem";
import SideItem from "../components/SideItem";
import FormatDate from "../components/FormatDate";
import useAuth from "../hooks/useAuth";

const UserProfile = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [orderedPizzas, setOrderedPizzas] = useState({});
  const [orderedSides, setOrderedSides] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const userOrders = await getOrderByUserId(auth.userId);
        setOrders(userOrders);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
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

      
      const results = await Promise.all(promises);

      
      const validResults = results.filter((result) => result !== null);

      
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
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading orders: {error}</p>
          ) : (
            <div>
              {orders?.length ? (
                orders.map((order, index) => (
                  <div key={index} className="shadow-lg mb-6 bg-white w-">
                    <div>
                      <div>
                        <span className="font-bold">Order Date: </span>
                        <span>
                          <FormatDate dateString={order.order_date} />
                        </span>
                      </div>
                      <div className="ml-2 mb-4">
                        {orderedPizzas[order.order_id] &&
                          orderedPizzas[order.order_id].map((pizza, index) => (
                            <>
                              <h2 className="order-heading">Ordered Pizza:</h2>
                              <PizzaItem key={index} pizza={pizza} />
                            </>
                          ))}
                      </div>
                    </div>
                    <div>
                      <div className="ml-2 mb-4">
                        {orderedSides[order.order_id] &&
                          orderedSides[order.order_id].map((side, index) => (
                            <>
                              <h2 className="order-heading">Ordered Side:</h2>
                              <SideItem key={index} side={side} />
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No orders to display</p>
              )}
            </div>
          )}
        </span>
      </div>
    </>
  );
};

export default UserProfile;
