import ReactPlayer from "react-player";

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

export default VideoPlayer;
