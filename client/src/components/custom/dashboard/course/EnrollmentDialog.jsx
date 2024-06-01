import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  DollarSignIcon,
  CircleAlert,
  UserIcon,
  XCircleIcon,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import userService from "../../../../services/user";

const EnrollmentDialog = ({
  course,
  triggerRef,
  user,
  curriculumRef,
  navigate,
}) => {
  const scrollToCurriculum = () => {
    curriculumRef.current.scrollIntoView({ behavior: "smooth" });
  };

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

  return (
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
              <span className="text-gray-500 dark:text-gray-400">$0.00</span>
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
  );
};

export default EnrollmentDialog;
