import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Landing from "./components/custom/landing/Landing";
import Onboarding from "./components/custom/landing/Onboarding";
import Login from "./components/custom/authentication/Login";
import Main from "./components/custom/dashboard/Main";
import Dashboard from "./components/custom/dashboard/Dashboard";
import Course from "./components/custom/dashboard/Course";
import { fetchUser } from "./reducers/userReducer";
import { fetchCourses } from "./reducers/courseReducer";
import PageNotFound from "./components/custom/extras/PageNotFound";
import Loading from "./components/custom/extras/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = () =>
      new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds

    authenticate().then(() => {
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      !localStorage.getItem("user") &&
      pathname !== "/onboarding" &&
      pathname !== "/" &&
      pathname !== "/login"
    ) {
      navigate("/");
    }
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("user") !== "[object Object]") {
      dispatch(fetchUser());
      dispatch(fetchCourses());
    }
  }, [navigate]);


  return (
    <div className="font-geist overflow-y-hidden">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/login"
          element={
            <div className="h-screen flex justify-center items-center">
              <Login />
            </div>
          }
        />
        <Route path="/dashboard" element={<Main component={Dashboard} />} />
        <Route path="/courses/:id" element={<Main component={Course} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
