import { Button } from "@/components/ui/button";
import { LeafIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="absolute w-full h-16 bg-accent flex items-center justify-between px-4 md:px-8">
      <div className="flex font-semibold items-center text-lg space-x-1">
        <LeafIcon className="w-8 h-8 " />
        <p className="hidden md:block">HunarBazar</p>
      </div>
      <div className="space-x-4">
        <Link to="/login">
          <Button variant={"outline"} className="text-sm md:text-base">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
