import { getAllOrders } from "../api/orders";
import { useFetchData } from "../hooks/useFetchData";
import FormatDate from "../components/FormatDate";

const Orders = () => {
  const { data: orders, isLoading: isLoadingOrders } =
    useFetchData(getAllOrders);

  const handleDeleteOrder = async (orderId) => {
    
  }

  console.log("orders from Orders component:", orders);

  return (
    <div className="flex-col rounded-lg h-100 w-max bg-gray-200">
      <div id="body" className="flex justify-center font-bold mb-6">
        MANAGE ORDERS
      </div>

      {isLoadingOrders ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto table-with-spacing">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>User Id</th>
              <th>Order Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length ? (
              orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.user_id}</td>
                  <td>
                    <FormatDate dateString={order.order_date} />
                  </td>
                  <td>
                    <button
                      className="h-10 bg-blue-400 text-white font-bold px-1 py-1 rounded-lg hover:bg-blue-600 hover:font-extrabold shadow-lg"
                      onClick={() => handleDeleteOrder(order.order_id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No orders to display</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
