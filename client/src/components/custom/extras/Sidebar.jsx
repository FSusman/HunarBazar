import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
  XIcon,
  MenuIcon,
} from "lucide-react";
import { useEffect } from "react";

const Sidebar = ({ isActive, setIsActive }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeTab =
    pathname === "/dashboard"
      ? "home"
      : pathname === "/courses"
      ? "courses"
      : "";

  useEffect(() => {
    setIsActive(false);
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="rounded-full p-4 bg-blue-200 absolute z-50 top-4 right-8 "></div>
      <div
        onClick={() => setIsActive(true)}
        className={`z-50 top-4 left-8 hover:cursor-pointer ${
          isActive ? "hidden" : "absolute"
        }`}
      >
        <MenuIcon />
      </div>

      <div
        className={`fixed transition-all duration-300 z-50 bg-background ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } border-r h-screen`}
      >
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="flex justify-between items-center">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Home
              </h2>
              <XIcon
                onClick={() => setIsActive(!isActive)}
                className="hover:cursor-pointer w-5 h-5"
              />
            </div>
            <div className="space-y-1">
              <Link to="/dashboard">
                <Button
                  variant={activeTab === "home" ? "secondary" : "ghost"}
                  className="w-full gap-1 items-center justify-start"
                >
                  <HomeIcon className="w-5 h-5" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="flex justify-between items-center">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Settings
              </h2>
            </div>
            <div className="space-y-1">
              <Link to="/settings">
                <Button
                  variant={"ghost"}
                  className="w-full gap-1 items-center justify-start"
                >
                  <SettingsIcon className="w-5 h-5" />
                  Settings
                </Button>
              </Link>
              <Button
                variant={"ghost"}
                className="w-full text-red-700 gap-1 items-center justify-start"
                onClick={handleLogout}
              >
                <LogOutIcon className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
