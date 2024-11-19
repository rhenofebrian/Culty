import { ProductForm } from "@/components/forms/ProductForm";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState({
    nama: "",
    harga: 0,
    gambar: "",
    stok: 0,
    id: 0,
  });

  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/products/" + params.productId);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditProduct = async (values) => {
    try {
      await axiosInstance.patch("/products/" + params.productId, {
        nama: values.nama,
        harga: values.harga,
        stok: values.stok,
        gambar: values.gambar,
      }); // (patch) hanya data yang dikirim yang akan keganti
      alert("Product changed");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <AdminLayout title="Edit product" desc="Editing product">
      {product.id ? (
        <ProductForm
          cardTitle={"Editing " + product.nama}
          onSubmit={handleEditProduct}
          buttonText={true}
          defaultName={product.nama}
          defaultPrice={product.harga}
          defaultStock={product.stok}
          defaultImg={product.gambar}
        />
      ) : null}
    </AdminLayout>
  );
};
