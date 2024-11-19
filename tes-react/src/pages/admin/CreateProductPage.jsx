import { AdminLayout } from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/components/forms/ProductForm";

export const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleCreateProduct = async (values) => {
    try {
      await axiosInstance.post("/products", {
        nama: values.nama,
        harga: values.harga,
        stok: values.stok,
        gambar: values.gambar,
      });
      alert("product added");

      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout title="Create Products" description="Add new products">
      <ProductForm
        cardTitle="Add your product"
        onSubmit={handleCreateProduct}
        buttonText={false}
      />
    </AdminLayout>
  );
};
