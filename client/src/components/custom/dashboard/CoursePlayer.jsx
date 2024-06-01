import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../extras/Loading";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactPlayer from "react-player";

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

const VideoPlayer = () => {
  return (
    <div className="row-span-3 w-full h-full">
      <ReactPlayer
        className="react-player w-full h-full"
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        width="100%"
        height="100%"
      />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="hidden lg:flex">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex justify-between items-center">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Home
            </h2>
          </div>
          <div className="space-y-1">
            <Button
              variant={"ghost"}
              className="w-full gap-1 items-center justify-start"
            >
              <HomeIcon className="w-5 h-5" />
              Dashboard
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="flex justify-between items-center">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Settings
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  return (
    <div className="bg-blue-200">
      <ScrollArea>Overview</ScrollArea>
    </div>
  );
};

export default CoursePlayer;
