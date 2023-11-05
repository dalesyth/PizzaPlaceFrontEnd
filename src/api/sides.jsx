import axiosInstance from "./axios";


export async function getAllSides() {
    try {
        const response = await axiosInstance.get(`/sides`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error getting sides: ", error);
        throw error;
    }
}

export async function getOrderedSidesByOrderId(order_id) {
    try {
        const response = await axiosInstance.get(`/sides/${order_id}/ordered-sides`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error getting side by orderId:", error)
    }
}