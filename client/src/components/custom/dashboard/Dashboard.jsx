import { ClockIcon, UserIcon } from "lucide-react";
import { CardContent, Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import Loading from "../extras/Loading";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Dashboard = () => {
  const { user, courses } = useSelector((state) => state);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = () =>
      new Promise((resolve) => setTimeout(resolve, 2000));

    authenticate().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (
    !Array.isArray(courses) ||
    localStorage.getItem("user") === "[object Object]" ||
    localStorage.getItem("user") === null
  ) {
    return <Loading />;
  }

  const handleWishlist = (course) => {
    toast(`Adding to your wishlist`, {
      description: "Fun fact: this feature does not work",
    });
  };

  return (
    <main className="flex-1 p-6 md:p-10 grid gap-6 md:gap-10">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900  mb-2">
          Greetings, {user.name}!
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome back, hope you're having a great day
        </p>
      </div>
      <main>
        <section className="mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-2xl font-bold">Resume Learning</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {user && user.enrolledCourses && user.enrolledCourses.length > 0 ? (
              user.enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start mb-4">
                      <LazyLoadImage
                        effect=""
                        alt="Course Thumbnail"
                        className="rounded-md mr-3"
                        width={64}
                        height={6}
                        src={course.courseThumbnail}
                        style={{
                          aspectRatio: "1/1",
                          objectFit: "cover",
                          filter: "blur(20px)",
                          transition: "filter 0.5s ease",
                        }}
                        loading="lazy"
                        onLoad={(e) => (e.target.style.filter = "blur(0px)")}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">{course.title}</h3>
                        <p className="text-gray-500 text-sm">
                          By {course.instructor}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-gray-600 flex mb-2 space-x-1">
                        <UserIcon />
                        <p>{course.students} students</p>
                      </p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <ClockIcon className="h-5 w-5 mr-1" />
                        {course.timeRequired}
                      </div>
                    </div>
                    <div className="w-full ">
                      <Link to={`/course/${course.id}`}>
                        <Button
                          className="ml-auto"
                          onClick={() =>
                            toast("Courses are under development.", {
                              description: "Thank you for registering.",
                            })
                          }
                        >
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No enrolled courses</p>
            )}
          </div>
        </section>
        <section className="mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-2xl font-bold">Recommended Courses</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {courses && courses.length > 0 ? (
              courses
                .filter((course) => course.content.length > 1)
                .map((course) => (
                  <Card
                    key={course.id}
                    className="rounded-md border overflow-hidden"
                  >
                    <LazyLoadImage
                      effect=""
                      alt="Course Thumbnail"
                      className="rounded-t-md w-full"
                      src={course.courseThumbnail}
                      style={{
                        aspectRatio: "2/1",
                        objectFit: "cover",
                        filter: "blur(20px)",
                        transition: "filter 0.5s ease",
                      }}
                      loading="lazy"
                      onLoad={(e) => (e.target.style.filter = "blur(0px)")}
                    />
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-500 mb-4">{course.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 flex mb-2 space-x-1">
                          <UserIcon />
                          <p>{course.students} students</p>
                        </p>
                        <Link
                          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                          to={`/courses/${course.id}`}
                        >
                          View
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div>
                <Loading />
              </div>
            )}
          </div>
        </section>
        <section className="mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-2xl font-bold">Upcoming Courses</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {courses && courses.length > 0 ? (
              courses
                .filter((course) => course.content.length === 1)
                .map((course) => (
                  <Card
                    key={course.id}
                    className="rounded-md border overflow-hidden"
                  >
                    <LazyLoadImage
                      effect=""
                      alt="Course Thumbnail"
                      className="rounded-t-md w-full"
                      src={course.courseThumbnail}
                      style={{
                        aspectRatio: "2/1",
                        objectFit: "cover",
                        filter: "blur(20px)",
                        transition: "filter 0.5s ease",
                      }}
                      loading="lazy"
                      onLoad={(e) => (e.target.style.filter = "blur(0px)")}
                    />
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-500 mb-4">{course.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-primary-500  flex items-center">
                          By {course.instructor}
                        </div>
                        <Button onClick={() => handleWishlist(course)}>
                          Wishlist
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div>
                <Loading />
              </div>
            )}
          </div>
        </section>
      </main>
    </main>
  );
};

export default Dashboard;
