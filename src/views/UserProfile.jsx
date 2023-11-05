import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrderByUserId, getOrderedPizzaByOrderId } from "../api/orders";
import { getOrderedSidesByOrderId } from "../api/sides";

import useAuth from "../hooks/useAuth";

const UserProfile = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [pizzas, setPizzas] = useState([]);

  // console.log("auth from UserProfile:", auth);
  // console.log("username from UserProfile:", username);

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const userOrders = await getOrderByUserId(auth.userId);

        console.log("userOrders from UserProfile:", userOrders);

        for (const userOrder of userOrders) {
          const order_id = userOrder.order_id;
          console.log("order_id from getUserOrders:", order_id);
          try {
            const orderedPizza = await getOrderedPizzaByOrderId(order_id);
            const orderedSides = await getOrderedSidesByOrderId(order_id);

            console.log("orderedPizza from getUserOrders:", orderedPizza);
            console.log("orderedSides from getUserOrders:", orderedSides);
          } catch (error) {
            console.error("Error getting ordered pizza:", error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserOrders();
  }, []);

  console.log("orders from UserProfile:", orders);
  console.log("pizzas from UserProfile:", pizzas);

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
            {/* {orders.map((order, index) => {
              return (
                <div key={index}>
                  <div>
                    <span>Order Date: </span>
                    <span>{order.order_date}</span>
                  </div>
                  <div></div>
                </div>
              );
            })} */}
          </div>
        </span>
      </div>
    </>
  );
};

export default UserProfile;
