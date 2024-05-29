import { MountainIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Loading = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    toast("Logout Successful", {
      icon: <CheckCircleIcon className="text-green-600" />,

      description: "Redirecting to login page",
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="absolute w-full top-0 ">
      <div className="flex flex-col items-center justify-center h-screen relative">
        <div className="animate-bounce">
          <MountainIcon className="h-16 w-16 text-gray-900" />
        </div>

        <p className="mt-8 text-center text-gray-500 ">
          Hang tight, <br /> we're getting everything ready for you!
        </p>
        <div className="absolute bottom-4 w-full  text-sm text-gray-500 ">
          <div className="flex-col items-center text-center flex justify-center">
            <p className="">Having issues with loading?</p>
            <p
              onClick={handleLogout}
              className="underline hover:no-underline hover:cursor-pointer"
            >
              Try logging in again?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
