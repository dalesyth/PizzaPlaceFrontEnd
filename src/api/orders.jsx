import axiosInstance from "./axios";

export async function getAllOrders() {
  try {
    const response = await axiosInstance.get('/orders', {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error getting all orders:", error)
  }
}

export async function getOrderByUserId(user_id) {
  
  try {
    const response = await axiosInstance.get(`/orders/${user_id}/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error getting order by userId: ", error);
    throw error;
  }
}

export async function getOrderedPizzaByOrderId(order_id) {
  
  try {
    const response = await axiosInstance.get(`/ordered-pizza/${order_id}/order`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response || response.length === 0) {
      return null
    } else {
      return response.data;
    }
    
    
  } catch (error) {
    console.error("Error getting ordered pizza by orderId:", error)
    throw error;
  }
}

export async function createNewOrder({ user_id, order_date, order_total }) {
  
  try {
    const response = await axiosInstance.post(
      "/orders",
      {
        user_id,
        order_date,
        order_total,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating new order: ", error);
    throw error;
  }
}

export async function addPizzaToOrder({
  order_id,
  title,
  pizza_price,
  quantity,
  crust,
  sauce,
}) {
  
  try {
    const response = await axiosInstance.post(
      "/ordered-pizza",
      {
        order_id,
        title,
        pizza_price,
        quantity,
        crust,
        sauce,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error adding pizza to order: ", error);
    throw error;
  }
}

export async function attachToppingsToOrderedPizza({ topping_id, pizza_id }) {
  const responses = [];

  const toppingIds = Array.isArray(topping_id) ? topping_id : [topping_id];

  for (const toppingId of toppingIds) {
    try {
      const response = await axiosInstance.patch(
        `/toppings/${pizza_id}/addTopping`,
        {
          topping_id: toppingId,
          pizza_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      responses.push(response.data);
      
    } catch (error) {
      console.error(
        `Error attaching topping ${toppingId} to ordered pizza ${pizza_id}:`,
        error
      );
    }
  }
  
  return responses;
}

export async function addSideToOrder({ sideId, orderId, sidePrice }) {
  try {
    const response = await axiosInstance.patch(
      `/sides/${orderId}/add-side`,
      {
        sideId,
        orderId,
        sidePrice,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding side to order:", error);
    throw error;
  }
}

export const deleteOrder = async (orderId) => {
  console.log("orderId from deleteOrder API call:", orderId)
  try {
    const response = await axiosInstance.delete(`/orders/delete/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error)
  }
}
