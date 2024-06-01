import { GhostIcon } from "lucide-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]  p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="relative flex    w-full max-w-[300px] mx-auto">
          <div className="mx-auto  ">
            <GhostIcon className="w-16 h-16" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Oops! Page not found
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          to="/"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
