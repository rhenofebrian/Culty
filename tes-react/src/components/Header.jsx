import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoCart, IoPersonCircle } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { useEffect } from "react";
import { fetchCart } from "@/services/cartService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { History } from "lucide-react";

export const Header = () => {
  const userSelector = useSelector((state) => state.user);
  const cartSelector = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("current_user");

    dispatch({
      type: "USER_LOGOUT",
    });
  };

  // fungsi fetchCart dipindahkan ke ./store/cartService.js agar terlihat rapih dan bisa reusable

  useEffect(() => {
    fetchCart(userSelector.id);
  }, []);

  return (
    <header className="h-16 border-b flex items-center justify-between px-10">
      {/* BRAND */}
      <div>
        <Link to="/">
          <p className="text-2xl font-bold hover:cursor-pointer">CULTY</p>
        </Link>
      </div>

      {/* SEARCH BAR */}
      <Input className="max-w-[600px]" placeholder="Search products" />

      {/* BUTTONS */}
      <div className="flex space-x-4 h-5 items-center">
        <div className="flex space-x-2">
          <Link to="/cart">
            <Button variant="ghost">
              <IoCart className="h-6 w-6 mr-2" />
              <span className="text-lg font-bold">
                {userSelector.id ? cartSelector.items.length : 0}
              </span>
            </Button>
          </Link>

          <Link to="/history">
            <Button size="icon" variant="ghost">
              <History className="h-6 w-6 " />
            </Button>
          </Link>
        </div>

        <Separator orientation="vertical" />

        <div className="flex space-x-2 items-center">
          {userSelector.id ? (
            <>
              <IoPersonCircle className="h-8 w-8" />
              <div className="!mx-0 p-2 flex justify-center items-center">
                {userSelector.username} ({userSelector.role})
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost">
                    <IoMdLogOut
                      className="!mx-0 h-8 w-8 flex items-center justify-center"
                      color="red"
                    />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to log out?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Link to="/login2">
                <Button>Log In</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
