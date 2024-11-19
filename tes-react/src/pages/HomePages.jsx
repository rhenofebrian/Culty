import { ProductCard } from "../components/ProductCard";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const userSelector = useSelector((state) => state.user);

  const productsLists = products.map((product) => {
    return (
      <ProductCard
        key={product.id}
        id={product.id}
        img={product.gambar}
        name={product.nama}
        stock={product.stok}
        price={product.harga}
      />
    );
  });

  //FETCHING FROM FAKE API
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch the products data once, while home page is mounted
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main className="min-h-[100vh] max-w-screen-xl mx-auto px-4 mt-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          {userSelector.id ? (
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
              Hi {userSelector.username}!
            </h1>
          ) : (
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
              Hi Folks!
            </h1>
          )}
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Make The Different Culture For the Better Future
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p>Loading...</p>{" "}
            {/* You can replace this with a spinner or any other loading indicator */}
          </div>
        ) : (
          <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {productsLists}
          </div>
        )}
      </main>
    </>
  );
};
