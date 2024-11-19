import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GuestPage } from "@/components/guard/GuestPage";

const loginFormScheme = z.object({
  username: z
    .string()
    .min(5, "username must be at least 5 characters")
    .max(16, "username has to be less than 16 characters"),
  password: z.string().min(8, "password must be at least 8 characters"),
});

export const NewLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form1 = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormScheme),
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async (values) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: values.username,
          password: values.password,
        },
      });

      if (
        !userResponse.data.length ||
        userResponse.data[0].password !== values.password
      ) {
        alert("incorrect password or username  ");
        return;
      }

      alert("successfully logged in as " + userResponse.data[0].username);

      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data[0].username,
          id: userResponse.data[0].id,
          role: userResponse.data[0].role,
        },
      });

      localStorage.setItem("current_user", userResponse.data[0].id);
      form1.reset();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    // alert(`Username: ${values.username} | Password: ${values.password}`);
  };

  return (
    <GuestPage>
      <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen-md h-[90vh]">
        <Form {...form1}>
          <form
            onSubmit={form1.handleSubmit(handleLogin)}
            className="w-full max-w-[540px]"
          >
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
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

                <div>
                  <FormField
                    control={form1.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type={isChecked ? "text" : "password"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={(checked) => setIsChecked(checked)}
                    id="show-password"
                  />
                  <Label htmlFor="show-password">Show Password</Label>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-4 w-full">
                  <Button type="submit">Login</Button>
                  <Link to="/register">
                    <Button variant="link" className="w-full">
                      Sign up instead
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
