import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
      <p className="text-6xl font-semibold pb-5">404 Page Not Found</p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};
