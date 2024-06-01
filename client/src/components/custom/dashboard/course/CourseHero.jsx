import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EnrollmentDialog from "./EnrollmentDialog";
import DetailsDialog from "./DetailsDialog";

const CourseHero = ({
  course,
  mainRef,
  triggerRef,
  user,
  curriculumRef,
  navigate,
}) => {
  return (
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
                <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
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
            <EnrollmentDialog
              course={course}
              user={user}
              triggerRef={triggerRef}
              curriculumRef={curriculumRef}
              navigate={navigate}
            />
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <DetailsDialog triggerRef={triggerRef} user={user} />
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
  );
};
export default CourseHero;
