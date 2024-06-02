import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";


const Sidebar = () => {
  return (
    <div className="hidden lg:flex">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex justify-between items-center">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Home
            </h2>
          </div>
          <div className="space-y-1">
            <Button
              variant={"ghost"}
              className="w-full gap-1 items-center justify-start"
            >
              <HomeIcon className="w-5 h-5" />
              Dashboard
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="flex justify-between items-center">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Settings
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
