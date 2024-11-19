import { CartItem } from "@/components/CartItem";
import { SignedInPage } from "@/components/guard/SignedInPage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/lib/axios";
import { fetchCart } from "@/services/cartService";
import { useSelector } from "react-redux";

export const CartPage = () => {
  const cartSelector = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.user);

  // !!! handle checkout harusnya terjadi di backend !!!
  //check if all items are available
  const handleCheckout = async () => {
    for (let i = 0; i < cartSelector.items.length; i++) {
      const currentCartItem = cartSelector.items[i];
      if (currentCartItem.count > currentCartItem.product.stok) {
        alert("One of your items is unavailable");
        return;
      }
    }

    // buat variabel untuk menyimpan totalPrice dan tax
    const totalPrice = cartSelector.items.reduce((a, b) => {
      return a + b.count * b.product.harga;
    }, 0);
    const tax = totalPrice / 10;

    await axiosInstance.post("/transactions", {
      userId: userSelector.id,
      itemPrice: totalPrice,
      tax: tax,
      transactionDate: new Date(),
      items: cartSelector.items,
    });
    alert("payment success");

    //update stock setelah melakukan payment untuk mengurangi stok yang tersedia
    cartSelector.items.forEach(async (cartItem) => {
      await axiosInstance.patch("/products/" + cartItem.productId, {
        stok: cartItem.product.stok - cartItem.count,
      });
    });

    //delete cart setelah semua data sudah di cek
    const removeCartItems = async (cartItems) => {
      try {
        // Map each cart item to a delete request promise
        const deletePromises = cartItems.map((cartItem) =>
          axiosInstance.delete(`/carts/${cartItem.id}`)
        );

        // Wait for all delete requests to complete
        await Promise.all(deletePromises);

        // Optionally, fetch the updated cart or perform other actions
        // fetchCart(userSelector.id);
      } catch (err) {
        console.error(err);
      }
    };
    removeCartItems(cartSelector.items);

    fetchCart(userSelector.id);
  };

  return (
    <SignedInPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>
        <div className="mt-10">
          <Separator />
          <div className="grid grid-cols-12 gap-8 my-8">
            <div className="col-span-7 gap-6 flex flex-col">
              {cartSelector.items.map((cartproduct) => {
                return (
                  <CartItem
                    key={cartproduct.product.id} // agar tidak muncul error message key
                    name={cartproduct.product.nama} //name adalah props dari cartPage, sedangkan nama adalah isi dari objek products
                    price={cartproduct.product.harga}
                    img={cartproduct.product.gambar}
                    count={cartproduct.count}
                    stock={cartproduct.product.stok}
                    cartId={cartproduct.id}
                  />
                );
              })}
            </div>

            <Card className="col-span-5 bg-gray-50 border-0 h-min">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex pb-4 justify-between border-b">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span>
                    Rp
                    {cartSelector.items
                      .reduce((a, b) => {
                        return a + b.count * b.product.harga;
                      }, 0)
                      .toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex py-4 justify-between border-b">
                  <span className="text-sm text-muted-foreground">
                    Taxes (10%)
                  </span>
                  <span>
                    Rp
                    {(
                      cartSelector.items.reduce((a, b) => {
                        return a + b.count * b.product.harga;
                      }, 0) / 10
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex-col flex gap-6">
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-muted-foreground">
                    Order Total:
                  </span>
                  <span className="font-semibold">
                    Rp
                    {(
                      cartSelector.items.reduce((a, b) => {
                        return a + b.count * b.product.harga;
                      }, 0) +
                      cartSelector.items.reduce((a, b) => {
                        return a + b.count * b.product.harga;
                      }, 0) /
                        10
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
                <Button onClick={handleCheckout} className="w-full">
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </SignedInPage>
  );
};
