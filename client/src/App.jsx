import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Landing from "./components/custom/landing/Landing";
import Onboarding from "./components/custom/landing/Onboarding";
import Login from "./components/custom/authentication/Login";
import Main from "./components/custom/dashboard/Main";
import Dashboard from "./components/custom/dashboard/Dashboard";
import Course from "./components/custom/dashboard/course/Course";
import { fetchUser } from "./reducers/userReducer";
import { fetchCourses } from "./reducers/courseReducer";
import PageNotFound from "./components/custom/extra pages/PageNotFound";
import CoursePlayer from "./components/custom/dashboard/coursePlayer/CoursePlayer";
import axios from "axios";

function App() {
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

  useEffect(() => {
    async () => {
      const response = await axios.get(
        "https://hunarbazar.onrender.com/api/users"
      );
      if (!response.ok) {
        <ErrorPage />;
      }
    };
  }, []);

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
        <Route path="/course/:id" element={<Main component={CoursePlayer} />} />
      </Routes>
    </div>
  );
}

export default App;
