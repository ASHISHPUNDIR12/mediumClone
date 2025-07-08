import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs, useUser } from "../hooks";
import Skeleton from "../components/Skeleton";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200">
      {/* Appbar should be outside the constrained content */}
      <Appbar authorName={user?.name || "Anonymous"} />

      {/* Blog content - more responsive container */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mt-6 sm:mt-8 md:mt-10">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="w-full mb-4 sm:mb-6 md:mb-8">
              <BlogCard
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishDate="06-06-2025"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;