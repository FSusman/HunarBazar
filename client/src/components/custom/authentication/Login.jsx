import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import userService from "../../../services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CircleCheck, XCircleIcon } from "lucide-react";

const Login = ({ setReturning }) => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      toast("Login Failed", {
        icon: <XCircleIcon className="text-red-600" />,
        description: "Please fill the entire form",
      });
      return;
    }

    try {
      const response = await userService.login({ username, password });

      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));

      toast("Login successful", {
        description: "Redirecting to dashboard",
        icon: <CircleCheck className="text-green-600" />,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response.status === 401) {
        toast("Login Failed", {
          icon: <XCircleIcon className="text-red-600" />,
          description: "Incorrect username or password",
        });
      } else {
        toast("Login Failed", {
          icon: <XCircleIcon className="text-red-600" />,

          description: "An error occurred during login",
        });
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2 text-left">
              <Label htmlFor="username">Username</Label>
              <Input
                ref={usernameRef}
                autoComplete="off"
                name="username"
                type="text"
                placeholder="Your username"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                ref={passwordRef}
                name="password"
                autoComplete="off"
                placeholder="12345678"
                type="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <div
            onClick={() => {
              navigate("/onboarding");
              setReturning("false");
            }}
            className="underline hover:cursor-pointer"
          >
            Sign up
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
