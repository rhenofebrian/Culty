import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axios";
import { fetchCart } from "@/services/cartService";
import { useEffect, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ProductDetailPage = () => {
  const params = useParams();
  const [detail, setDetail] = useState({
    nama: "",
    harga: 0,
    gambar: "",
    stok: 0,
    id: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const userSelector = useSelector((state) => state.user);

  const increamentQuantity = () => {
    if (count < detail.stok) {
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
      // GET untuk memastikan item sudah ada dalam cart atau belum
      const cartDetailResponse = await axiosInstance.get("/carts", {
        params: {
          userId: userSelector.id,
          _embed: "product",
        },
      });

      // cek jika ada productId yang sama dengan id product yang sedang kita tambah, jika ada lakukan patch
      const existingItem = cartDetailResponse.data.find((cart) => {
        return cart.productId === detail.id;
      });

      if (!existingItem) {
        await axiosInstance.post("/carts", {
          userId: userSelector.id,
          productId: detail.id,
          count,
        });
      } else {
        if (existingItem.count + count > existingItem.product.stok) {
          alert("quantity is over the stock");
          return;
        }

        await axiosInstance.patch("/carts/" + existingItem.id, {
          count: existingItem.count + count,
        });
      }

      alert("item added to cart");
      fetchCart(userSelector.id);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/products/" + params.productId);
      setDetail(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8 ">
      <div className="grid grid-cols-2 gap-8 ">
        {isLoading ? (
          <Skeleton className="w-[480px] h-[720px]" />
        ) : (
          <img src={detail.gambar} alt={detail.nama} className="w-full" />
        )}

        <div className="flex flex-col gap-1 justify-center">
          {isLoading ? (
            <Skeleton className="w-[480px] h-[28px]" />
          ) : (
            <h1 className="text-xl">{detail.nama}</h1>
          )}

          {isLoading ? (
            <Skeleton className="w-[480px] h-[36px]" />
          ) : (
            <h3 className="text-3xl font-bold">
              Rp{detail.harga.toLocaleString("id-ID")}
            </h3>
          )}

          <p className="text-muted-foreground">Stock Left: {detail.stok}</p>

          {isLoading ? (
            <Skeleton className="w-[480px] h-[40px] m-4" />
          ) : (
            <p className="text-sm text-muted-foreground mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              doloribus nostrum, ad molestias quasi facere ipsam soluta
              laudantium? Error, vel!
            </p>
          )}
          <div className="flex justify-between items-center gap-6 mt-6">
            <Button
              onClick={decreamentQuantity}
              disabled={count == 0}
              size="icon"
              variant="ghost"
            >
              <IoIosRemove className="h-6 w-6" />
            </Button>

            <p className="text-lg font-semibold">{count}</p>

            <Button
              onClick={increamentQuantity}
              disabled={count == detail.stok}
              size="icon"
              variant="ghost"
            >
              <IoIosAdd className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex items-center my-3 gap-4">
            <Button
              onClick={addToCart}
              disabled={!detail.stok || count < 1}
              className="w-full"
              size="lg"
            >
              {detail.stok > 0 ? "Add to cart" : "Out of stock"}
            </Button>
            <Button className="border" size="icon" variant="ghost">
              <IoHeartOutline className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
