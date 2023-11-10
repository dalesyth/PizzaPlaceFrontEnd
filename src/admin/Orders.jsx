import { getAllOrders } from "../api/orders";
import { useFetchData } from "../hooks/useFetchData";

const Orders = () => {
  const { data: orders, isLoading: isLoadingOrders } = useFetchData(getAllOrders);

  console.log("orders from Orders component:", orders);

  return (
    <article>
      <h2>Orders List</h2>
      {orders?.length ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              {order?.order_id} {order?.user_id} {order?.order_date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders to display</p>
      )}
    </article>
  );
};

export default Orders;
