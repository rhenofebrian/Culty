import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const dispatch = useDispatch();

  const hydrateAuth = async () => {
    try {
      const current_user = localStorage.getItem("current_user");
      if (!current_user) return;

      const userResponse = await axiosInstance.get("/users/" + current_user);
      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data.username,
          id: userResponse.data.id,
          role: userResponse.data.role,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    hydrateAuth();
  }, []);

  return {
    hydration: isHydrated,
  };
};
