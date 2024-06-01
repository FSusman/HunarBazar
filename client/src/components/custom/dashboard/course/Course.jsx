import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../extra pages/LoadingPage";
import CourseHero from "./CourseHero";
import CourseCurriculum from "./CourseCurriculum";

const Course = () => {
  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);
  const triggerRef = useRef(null);
  const curriculumRef = useRef(null);
  const mainRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div>
      <CourseHero
        course={course}
        mainRef={mainRef}
        triggerRef={triggerRef}
        user={user}
        curriculumRef={curriculumRef}
        navigate={navigate}
      />
      <CourseCurriculum course={course} curriculumRef={curriculumRef} />
    </div>
  );
};

export default Course;
