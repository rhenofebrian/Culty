import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "./ui/button";
import { IoCheckmarkCircle, IoClose } from "react-icons/io5";
import { axiosInstance } from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/services/cartService";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

//Componen produk per Item
export const CartItem = (props) => {
  const [count, setCount] = useState(props.count);
  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const debouncedUpdateCart = useDebouncedCallback(() => {
    updateCartQuantity();
  }, 1000);

  const removeCartItem = (cartId) => async (dispatch) => {
    try {
      await axiosInstance.delete("/carts/" + cartId);

      dispatch({
        type: "CART_REMOVE",
        payload: {
          cartId,
        },
      });
      fetchCart(useSelector.id);
      alert("item removed");
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = () => {
    dispatch(removeCartItem(props.cartId));
  };

  const updateCartQuantity = async () => {
    try {
      await axiosInstance.patch("/carts/" + props.cartId, {
        count: count,
      });
      fetchCart(userSelector.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    debouncedUpdateCart();
  }, [count]);

  return (
    <div className="flex gap-4">
      <div className="aspect-square w-full overflow-hidden rounded-md max-w-52">
        <img
          src={props.img}
          alt={props.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col">
          <p>{props.name}</p>
          <p className="font-bold">Rp {props.price.toLocaleString("id-ID")}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            disabled={count <= 1}
            onClick={() => setCount(count - 1)}
            variant="ghost"
            size="icon"
          >
            <IoIosRemove className="w-4 h-4" />
          </Button>
          <p className="text-lg font-bold">{count}</p>
          <Button
            disabled={count >= props.stock}
            onClick={() => setCount(count + 1)}
            variant="ghost"
            size="icon"
          >
            <IoIosAdd className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            {props.count > props.stock ? (
              <>
                <IoClose className="text-red-500 h-6 w-6" />
                <span className="text-sm text-muted-foreground">
                  Out of Stock
                </span>
              </>
            ) : (
              <>
                <IoCheckmarkCircle className="text-green-500 h-6 w-6" />
                <span className="text-sm text-muted-foreground">Available</span>
              </>
            )}
          </div>
          <Button
            onClick={handleRemove}
            className="text-destructive"
            variant="link"
          >
            Remove item
          </Button>
        </div>
      </div>
    </div>
  );
};
