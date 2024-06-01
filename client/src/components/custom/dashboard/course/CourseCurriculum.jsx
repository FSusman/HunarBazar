import { CircleCheckIcon, ClockIcon } from "lucide-react";

const CourseCurriculum = ({ course, curriculumRef }) => {
  return (
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
  );
};

export default CourseCurriculum;
