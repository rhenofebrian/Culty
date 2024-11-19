import { AdminPage } from "@/components/guard/AdminPage";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";

import { Label } from "@radix-ui/react-label";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";

export const ProductMManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [productName, setProductName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);
    setSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);
    setSearchParams(searchParams);
  };

  const searchProduct = () => {
    if (productName) {
      searchParams.set("search", productName);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: 10,
          _page: Number(searchParams.get("page")),
          nama: searchParams.get("search"),
        },
      });
      console.log(response.data); // cek data

      setHasNext(Boolean(response.data.next));
      setProducts(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = confirm(
      `You sure you want to delete ${selectedIds.length} products`
    );
    if (!confirmDelete) return;

    const deletePromises = selectedIds.map((productId) => {
      return axiosInstance.delete("/products/" + productId);
    });

    try {
      await Promise.all(deletePromises);
      alert(`Successfully delete ${selectedIds.length} product`);
      searchParams.set("page", Number(1));
      setSearchParams(searchParams);

      setSelectedIds([]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnCheckedProduct = (productId, checked) => {
    if (checked) {
      const prevSelectedIds = [...selectedIds];
      prevSelectedIds.push(productId);
      setSelectedIds(prevSelectedIds);
    } else {
      const productIndex = selectedIds.findIndex((id) => {
        return id == productId;
      });
      const prevSelectedIds = [...selectedIds];
      prevSelectedIds.splice(productIndex, 1);
      setSelectedIds(prevSelectedIds);
    }
    // SHORT WAY
    // if (checked) {
    //   setToBeDelete([...toBeDelete, productId]);
    // } else {
    //   setToBeDelete(toBeDelete.filter((id) => id !== productId));
    // }
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      fetchProducts();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);

  useEffect(() => {
    if (!searchParams.get("page") || searchParams.get("page") < 1) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <AdminPage>
      <AdminLayout
        title="Products Management"
        desc="Managing Our Products"
        rightSection={
          <div className="flex gap-4">
            {selectedIds.length ? (
              <Button onClick={handleDeleteProduct} variant="destructive">
                Delete {selectedIds.length} Products
              </Button>
            ) : null}

            <Link to="/admin/products/create">
              <Button>
                <IoAdd className="h-6 w-6 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        }
      >
        <div className="mb-8">
          <Label className="font-semibold">Search Product</Label>
          <div className="flex gap-4 mt-2">
            <Input
              onChange={(e) => setProductName(e.target.value)}
              className="max-w-[400px]"
              placeholder="search product.."
            />
            <Button onClick={searchProduct}>Search</Button>
          </div>
        </div>

        <Table className="p-4 border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      onCheckedChange={(checked) =>
                        handleOnCheckedProduct(product.id, checked)
                      }
                      checked={selectedIds.includes(product.id)}
                    />
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell> {product.nama}</TableCell>
                  <TableCell>
                    Rp {product.harga.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{product.stok}</TableCell>
                  <TableCell>
                    <Link to={"/admin/products/edit/" + product.id}>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-6 h-6" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <Button
                disabled={searchParams.get("page") == 1}
                onClick={handlePrevPage}
                variant="ghost"
              >
                <ChevronLeft className="w-6 h-6 mr-2" />
                Previous
              </Button>
            </PaginationItem>

            <PaginationItem className="mx-8 font-semibold">
              Page {searchParams.get("page")}
            </PaginationItem>

            <PaginationItem>
              <Button
                disabled={!hasNext}
                onClick={handleNextPage}
                variant="ghost"
              >
                Next
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </AdminLayout>
    </AdminPage>
  );
};
