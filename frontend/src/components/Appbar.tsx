import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full sticky top-0 z-10 bg-white/80 backdrop-blur border-b shadow-sm">
      <div className=" flex justify-between items-center py-2 px-2 sm:px-7">
        <Link to={"/blogs"}>
          <div className="text-xl font-bold tracking-tight text-gray-800 select-none cursor-pointer ">
            medium
          </div>
        </Link>

        <div className="flex items-center gap-3  ">
         <Link to={"/publish"}  >
          <button
            type="button"
            className="focus:outline-none mt-1 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2  "
          >
            + Publish
          </button>
         </Link>

          <Avatar name="Ashish" />
          <button onClick={()=>{
            localStorage.removeItem("token")
            navigate("/")
          }} className="border border-gray-300 bg-red-600 text-white p-1.5 ml-2 rounded-md text-sm font-medium hover:bg-gray-100 transition">
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
