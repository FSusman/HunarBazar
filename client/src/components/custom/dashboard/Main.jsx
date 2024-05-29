import React, { useState } from "react";
import Sidebar from "../extras/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Main = ({ component: Component, courses }) => {
  const [isActive, setIsActive] = useState(false);


  return (
    <div className="grid grid-cols-4 h-screen overflow-y-hidden">
      <Sidebar
        className="overflow-auto"
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <ScrollArea
        className={`col-span-4 pt-10   overflow-y-auto rounded-md border`}
      >
        <Component courses={courses} />
      </ScrollArea>
    </div>
  );
};

export default Main;
