import { axiosInstance } from "@/lib/axios";
import { globalStore } from "@/store/store";

//menambahkan item ke cart page
export const fetchCart = async (userId) => {
  try {
    const cartResponse = await axiosInstance.get("/carts", {
      params: {
        userId,
        _embed: "product",
      },
    });

    globalStore.dispatch({
      type: "CART_GET",
      payload: cartResponse.data,
    });
  } catch (err) {
    console.log(err);
  }
};
