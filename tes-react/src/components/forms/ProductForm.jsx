import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const ProductFormScheme = z.object({
  nama: z
    .string()
    .min(3, "Your sproduct name must be at least 3 characters")
    .max(80, "Your product name has to be less than 80 characters"),
  harga: z.coerce.number().min(10000, "price must be at least Rp 10000"),
  stok: z.coerce.number().min(1, "minimun stock quantity 1"),
  gambar: z.string().url("use valid url"),
});

export const ProductForm = (props) => {
  const {
    onSubmit,
    cardTitle,
    defaultName,
    defaultPrice,
    defaultStock,
    defaultImg,
    buttonText,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      nama: defaultName ? defaultName : "",
      stok: defaultStock ? defaultStock : 0,
      harga: defaultPrice ? defaultPrice : 0,
      gambar: defaultImg ? defaultImg : "",
    },
    resolver: zodResolver(ProductFormScheme),
  });

  const handleLoading = async (p) => {
    setIsLoading(true);
    try {
      await onSubmit(p);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLoading)}
        className="max-w-[540px] w-full"
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">{cardTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Product name has to be between 3 and 80 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Product name has to be between 3 and 80 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gambar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>input a valid URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Proccessing.."
                : buttonText
                ? "Save changes"
                : "Create Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
