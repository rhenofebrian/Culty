import { Button } from "./ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { axiosInstance } from "@/lib/axios";
import { useSelector } from "react-redux";
import { fetchCart } from "@/services/cartService";
import { Alert, AlertTitle } from "./ui/alert";

export const ProductCard = (props) => {
  const { img, name, price, stock, id } = props; // agar tidak perlu menggunakan {props.something} (mempersngkat)
  const [addAlert, setAddAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const userSelector = useSelector((state) => state.user);

  const increamentQuantity = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };
  const decreamentQuantity = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const addToCart = async () => {
    if (!userSelector.id) {
      alert("please login first");
      return;
    }
    try {
      const cartResponse = await axiosInstance.get("/carts", {
        params: {
          userId: useSelector.id,
          _embed: "product",
        },
      });

      // cek jika ada productId yang sama dengan id product yang sedang kita tambah, jika ada lakukan patch
      const existingProduct = cartResponse.data.find((cart) => {
        return cart.productId === id;
      });

      if (!existingProduct) {
        await axiosInstance.post("/carts", {
          userId: userSelector.id,
          productId: props.id,
          count,
        });
      } else {
        if (existingProduct.count + count > existingProduct.product.stok) {
          alert(
            `you only can add ${stock} product in your cart due to limited stock`
          );
          return;
        }
        await axiosInstance.patch("/carts/" + existingProduct.id, {
          count: existingProduct.count + count,
        });
      }
      setAddAlert(true);
      setTimeout(() => {
        setAddAlert(false);
      }, 3000);

      fetchCart(userSelector.id);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProduct = async () => {
    try {
      await axiosInstance.get("/products");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-[300px] h-[480px]" />
      ) : (
        <div className="p-4 w-full border rounded-md flex flex-col gap-4">
          {/* information product */}
          <Link to={"/productdetail/" + id}>
            <div className="aspect-square w-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={img}
                alt="product"
              />
            </div>

            <div>
              <p className="text-md md:text-sm">{name}</p>
              <p className="text-xl font-semibold">
                Rp {price.toLocaleString("id-ID")}
              </p>
              <p className="text-muted-foreground">Stock Left: {stock}</p>
            </div>
          </Link>

          <div className="flex flex-col gap-2">
            {/* button quantity */}
            <div className="flex justify-between items-center">
              <Button
                disabled={count == 0}
                onClick={decreamentQuantity}
                size="icon"
                variant="ghost"
              >
                <IoIosRemove className="h-6 w-6" />
              </Button>

              <p className="text-lg font-semibold">{count}</p>

              <Button
                disabled={count >= stock}
                onClick={increamentQuantity}
                size="icon"
                variant="ghost"
              >
                <IoIosAdd className="h-6 w-6" />
              </Button>
            </div>
            <Button
              disabled={!stock || count < 1}
              onClick={addToCart}
              className="w-full"
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock  "}
            </Button>
          </div>
        </div>
      )}
      {addAlert && (
        <Alert className="fixed top-4 max-w-xs left-1/2 transform -translate-x-1/2 bg-slate-50">
          <AlertTitle className="text-sm">Item added to cart</AlertTitle>
        </Alert>
      )}
    </>
  );
};
