import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = ({ authorName }: { authorName: string }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full sticky top-0 z-10 bg-white/80 backdrop-blur border-b shadow-sm">
      {/* Outer full-width wrapper */}
      <div className="w-full">
        {/* Centered content wrapper with max width */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/blogs">
              <div className="text-lg sm:text-xl font-bold tracking-tight text-gray-800 select-none cursor-pointer">
                medium
              </div>
            </Link>

            {/* Right side: Publish, Avatar, Logout */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              <Link to="/publish">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 transition whitespace-nowrap"
                >
                  <span className="hidden sm:inline">+ Publish</span>
                  <span className="sm:hidden">+</span>
                </button>
              </Link>

              <div className="flex-shrink-0">
                <Avatar name={authorName || "Anonymous"} />
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="bg-red-600 hover:bg-red-500 text-white px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition whitespace-nowrap"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;