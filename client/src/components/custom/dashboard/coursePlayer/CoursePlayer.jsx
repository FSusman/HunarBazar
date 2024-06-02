import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../extra pages/LoadingPage";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import VideoPlayer from "./VideoPlayer";

const CoursePlayer = () => {
  const { courses } = useSelector((state) => state);
  const { id } = useParams();

  if (courses.length > 0) {
    var course = courses.find((course) => course.id === id);
  }

  return (
    <div>
      {course ? (
        <div className="grid grid-cols-4 h-screen">
          <div className="col-span-4 lg:col-span-3 grid grid-rows-4">
            <VideoPlayer />
            <Overview />
          </div>
          <Sidebar />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CoursePlayer;
