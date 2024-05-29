import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FadeInFromBottom from "../extras/FadeInFromBottom";
import Register from "../authentication/Register";
import Login from "../authentication/Login";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const [returning, setReturning] = useState("undefined");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="h-screen  flex flex-col py-20 text-center justify-center items-center">
        {returning === "undefined" && (
          <FadeInFromBottom>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Welcome to HunarBazar</h3>
              <h4 className="text-xl font-medium text-secondary-foreground">
                Are you a returning user?
              </h4>
              <div className="space-x-4">
                <Button onClick={() => setReturning("true")}>Yes</Button>
                <Button onClick={() => setReturning("false")}>No</Button>
              </div>
            </div>
          </FadeInFromBottom>
        )}
        {returning === "true" ? (
          <FadeInFromBottom className="bg-red-200">
            <Login setReturning={setReturning} />
          </FadeInFromBottom>
        ) : returning === "false" ? (
          <FadeInFromBottom>
            <Register setReturning={setReturning} />
          </FadeInFromBottom>
        ) : null}
      </div>
    </>
  );
};

export default Onboarding;
