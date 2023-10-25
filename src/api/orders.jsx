import axiosInstance from "./axios";

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

export async function createNewOrder({ user_id }) {
    console.log("user_id from createNewOrder: ", user_id)
    try {
    const response = await axiosInstance.post("/orders", {
        user_id,
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating new order: ", error);
    throw error;
  }
}

export async function addPizzaToOrder({ order_id, quantity, crust, sauce }) {
    try {
        const response = await axiosInstance.post("/ordered-pizza", {
            order_id,
            quantity,
            crust,
            sauce,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data
    } catch (error) {
        console.error("Error adding pizza to order: ", error);
        throw error;
    }
}
