import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ClockIcon,
  DraftingCompassIcon,
  UserIcon,
} from "lucide-react";
import Navbar from "../extras/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CardContent, Card } from "@/components/ui/card";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Landing = () => {
  const coursesRef = useRef(null);
  const [courses, setCourses] = useState([]);

  const scrollToCourses = () => {
    coursesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    axios
      .get("https://hunarbazar.onrender.com/api/courses")
      .then((response) => setCourses(response.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-screen flex flex-col justify-center items-center space-y-4 p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 px-2 py-1 border bg-gray-100 rounded-lg">
            <DraftingCompassIcon className="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <p className="text-foreground font-medium hover:cursor-pointer">
                Releasing in beta
              </p>
              <ArrowRightIcon className="h-5 w-5 text-black" />
            </div>
          </div>
          <h1 className="font-bold text-2xl md:text-5xl text-center">
            Be Capable, not label-able
          </h1>
        </div>
        <h2 className="text-secondary-foreground text-lg text-center">
          Handpicked courses that you can do <br className="hidden sm:block" />
          and level up in your professional life for free.
        </h2>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link to="/onboarding">
            <Button className="w-full md:w-auto">Get Started</Button>
          </Link>
          <Button
            variant={"outline"}
            onClick={scrollToCourses}
            className="w-full md:w-auto"
          >
            Courses
          </Button>
        </div>
      </div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-bold text-2xl md:text-4xl text-center">
                Explore Our Courses
              </h2>
              <p className="text-secondary-foreground text-lg text-center">
                Find the perfect course to help you reach your goals and unlock
                your full potential.
              </p>
            </div>
          </div>
          <div
            ref={coursesRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {courses.slice(0, 4).map((course, index) => (
              <Card key={index} className="w-full">
                <LazyLoadImage
                  alt="Course Image"
                  className="rounded-t-lg object-cover border-b bg-red-200 w-full"
                  src={course.courseThumbnail}
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                    filter: "blur(10px)",
                    transition: "filter 0.5s ease",
                  }}
                  loading="lazy"
                  onLoad={(e) => (e.target.style.filter = "blur(0px)")}
                />
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {course.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
