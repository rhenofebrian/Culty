import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormMessage,
  FormField,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";
import { GuestPage } from "@/components/guard/GuestPage";
import { Link, useNavigate } from "react-router-dom";

const RegisterFormScheme = z
  .object({
    username: z
      .string()
      .min(5, "username must be at least 5 characters")
      .max(16, "username has to be less than 16 characters"),
    password: z.string().min(8, "password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "make sure your password match"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const RegisterPage = () => {
  const navigate = useNavigate();

  const form1 = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(RegisterFormScheme),
  });

  const handleRegister = async (values) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: values.username,
        },
      });
      if (userResponse.data.length) {
        alert("username already taken");
        return;
      }

      await axiosInstance.post("/users", {
        username: values.username,
        password: values.password,
        role: "user",
      });
      alert("User registered");
      form1.reset();
      navigate("/login2");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GuestPage>
      <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
        <Form {...form1}>
          <form
            onSubmit={form1.handleSubmit(handleRegister)}
            className="w-full max-w-[540px]"
          >
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <FormField
                  control={form1.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form1.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form1.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-4 w-full">
                  <Button type="submit">Register</Button>
                  <Link to="/login2">
                    <Button variant="link" className="w-full">
                      Already have an account?
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};
