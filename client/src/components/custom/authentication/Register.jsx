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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import userService from "../../../services/user";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

const Register = ({ setReturning }) => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !username || !email || !password) {
      toast("Incomplete form", {
        icon: <XCircleIcon className="text-red-600" />,

        description: "Please fill the entire form.",
      });
      return;
    }

    try {
      const user = {
        name: name,
        username: username,
        password: password,
        email: email,
      };

      const savedUser = await userService.register(user);
      localStorage.setItem("user", savedUser);

      toast("Registration successful", {
        description: "Redirecting to dashboard",
        icon: <CheckCircle2Icon className="text-green-600" />,
      });
      localStorage.setItem("user", user);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast("Registration failed", {
          icon: <XCircleIcon className="text-red-600" />,

          description: "Username and email must be unique",
        });
      } else {
        toast("Registration failed", {
          icon: <XCircleIcon className="text-red-600" />,

          description: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <Card className="h-3/4">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <form name="register" netlify onSubmit={(e) => handleRegister(e)}>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:gap-4">
              <div className="grid gap-2">
                <Label className="text-left" htmlFor="name">
                  Name
                </Label>
                <Input
                  name="name"
                  autoComplete="off"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-left" htmlFor="username">
                  Username
                </Label>
                <Input
                  name="username"
                  autoComplete="off"
                  placeholder="Enter a username"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-left" htmlFor="email">
                Email
              </Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="off"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-left" htmlFor="password">
                Password
              </Label>
              <Input
                name="password"
                autoComplete="off"
                placeholder="12345678"
                type="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <p
              onClick={() => setReturning("true")}
              className="underline hover:cursor-pointer"
            >
              Sign in
            </p>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default Register;
