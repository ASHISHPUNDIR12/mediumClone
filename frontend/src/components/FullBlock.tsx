import { useUser, type Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

const FullBlock = ({ blog }: { blog: Blog }) => {
  const {user} = useUser();
  console.log(user?.name)
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200">
    
      <Appbar  authorName={user?.name && user?.name.trim() !== "" ? user?.name : "Anonymous"} />
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 mt-12 p-4 md:p-8">
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col gap-4">
          <div className="font-extrabold text-3xl md:text-4xl text-gray-900 mb-2 break-words">{blog.title}</div>
          <div className="font-light text-slate-400 text-sm mb-2">Posted on 6th June 2025</div>
          <div className="font-normal text-gray-800 text-base leading-relaxed whitespace-pre-line">{blog.content}</div>
        </div>
        <div className="w-full md:w-72 bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center gap-4 self-start">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">Author</div>
          <Avatar name={blog.author.name && blog.author.name.trim() !== "" ? blog.author.name : "Anonymous"} />
          <div className="font-extrabold text-lg text-gray-800 mt-2">{blog.author.name || "Anonymous"}</div>
          <div className="text-sm text-slate-500 text-center mt-1">
            Random catch phrase about the author's ability to grab the user's attention
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlock;
