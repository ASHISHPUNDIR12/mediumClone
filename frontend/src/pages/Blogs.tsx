import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import Skeleton from "../components/Skeleton";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200">
        <Appbar />
        <div className="flex flex-col items-center px-2 sm:px-4 md:px-8 lg:px-0 max-w-2xl mx-auto w-full mt-10">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200">
      <Appbar />
      <div className="flex flex-col items-center px-2 sm:px-4 md:px-8 lg:px-0 max-w-2xl mx-auto w-full">
        {blogs.map((blog) => {
          return (
            <div className="w-full flex flex-col justify-center items-center mt-10 sm:mt-8 md:mt-6 lg:mt-8">
              <BlogCard
                id={blog.id}
                authorName={blog.author?.name || "Anomys"}
                title={blog.title}
                content={blog.content}
                publishDate="06-06-2025"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
