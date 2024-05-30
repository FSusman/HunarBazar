import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  CircleCheckIcon,
  ClockIcon,
  DollarSignIcon,
  CircleAlert,
  UserIcon,
  XCircleIcon,
  CheckCircle2,
  Instagram,
  InstagramIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import userService from "../../../services/user";
import { useSelector } from "react-redux";
import Loading from "../extras/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Course = () => {
  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);
  const triggerRef = useRef(null);

  const navigate = useNavigate();

  const curriculumRef = useRef(null);
  const mainRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView();
    }
  }, [mainRef]);

  if (!Array.isArray(courses)) {
    return <Loading />;
  }

  const course = courses.find((course) => course.id === id);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleEnrollment = async () => {
    if (
      user.enrolledCourses.length < 3 &&
      Object.keys(user.extras).length !== 0
    ) {
      await userService.enrollCourse(course.id);
      toast("Enrollment successful", {
        icon: <CheckCircle2 className="text-green-600" />,
        description: "You have been enrolled in the course successfully.",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else if (Object.keys(user.extras).length === 0) {
      toast("Incomplete details", {
        icon: <CircleAlert />,
        action: {
          label: "Add details",
          onClick: () => {
            triggerRef.current?.click();
          },
        },
      });
    } else {
      toast("Too many enrollments", {
        icon: <XCircleIcon className="text-red-600" />,
        description: "You are already enrolled in 3 courses.",
      });
    }
  };

  const scrollToCurriculum = () => {
    curriculumRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDetails = async (e) => {
    e.preventDefault();
    console.log(e.target);
    

    const whatsappNumber = e.target.whatsapp.value;
    const instagramHandle = e.target.instagram.value;


    if (!whatsappNumber || !instagramHandle) {
      toast("Incomplete form", {
        description: "Please fill the entire form",
        icon: <XCircleIcon className="text-red-600" />,
      });
    }

    const extras = {
      whatsappNumber: whatsappNumber,
      instagramHandle: instagramHandle,
    };

    await userService.enterExtras(user.id, extras);
  };

  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32" ref={mainRef}>
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Course Preview
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {course.title}
              </h2>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>
                    {course.instructor.split("")[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-500 dark:text-gray-400">
                  Taught by {course.instructor}
                </p>
              </div>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                {course.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Course Duration</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {course.timeRequired}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Number of Students</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {course.students}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Enroll now</Button>
                </DialogTrigger>
                <Button variant={"outline"} onClick={scrollToCurriculum}>
                  Overview
                </Button>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Enrollment</DialogTitle>
                    <DialogDescription>
                      Confirm your enrollment for this course.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{course.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {course.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSignIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-500 dark:text-gray-400">
                          $0.00
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-500 dark:text-gray-400">
                            {course.timeRequired}
                          </span>
                        </div>
                        <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-500 dark:text-gray-400">
                          {course.students}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogTrigger>
                      <Button onClick={handleEnrollment}>Confirm</Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Dialog>
                <DialogTrigger ref={triggerRef} asChild className="hidden">
                  <Button>Enroll now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Final Step</DialogTitle>
                    <DialogDescription>
                      Enter your data to enroll in the course.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className=" items-center  space-y-2 w-full">
                      <form
                        className="space-y-4"
                        name="contact-details"
                        netlify
                        onSubmit={(e) => handleDetails(e)}
                      >
                        <div name="whatsInput">
                          <Label className="text-left" htmlFor="whatsapp">
                            Whatsapp Number
                          </Label>
                          <Input
                            name="whatsapp"
                            autoComplete="off"
                            placeholder="+92..."
                            required
                          />
                        </div>
                        <div name="instaInput">
                          <Label className="text-left" htmlFor="instagram">
                            Instagram Handle
                          </Label>
                          <Input
                            name="instagram"
                            autoComplete="off"
                            placeholder="@..."
                            required
                          />
                        </div>
                        <div className="w-full flex justify-end">
                          <Button type="submit">Submit</Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex justify-center">
            <LazyLoadImage
              alt="Course Preview"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              src={course.courseThumbnail}
              style={{
                aspectRatio: "1920/1080",
                objectFit: "cover",
                
                filter: "blur(20px)",
                transition: "filter 0.5s ease",
              }}
              loading="lazy"
              onLoad={(e) => (e.target.style.filter = "blur(0px)")}
            />
          </div>
        </div>
      </section>

      <section
        ref={curriculumRef}
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Course Curriculum
              </h2>
              <p className="text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                {course.courseCurriculum}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="grid gap-4">
                {course.content.map((module, id) => (
                  <div className="grid gap-1" key={id}>
                    <h3 className="text-xl font-bold">{module.moduleTitle}</h3>
                    <ul className="grid gap-2 text-sm">
                      {module.lessons.map((lesson, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CircleCheckIcon className="h-5 w-5 text-primary" />
                          <div className="flex justify-between w-full">
                            <span className="md:hidden block">
                              {lesson.lessonTitle.substring(0, 30)}...
                            </span>
                            <span className="md:block hidden">
                              {lesson.lessonTitle}
                            </span>

                            <span className="text-gray-500 space-x-2 flex items-center text-xs">
                              <p>{lesson.duration}</p>
                              <ClockIcon className="h-5 w-5 " />
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Course;
