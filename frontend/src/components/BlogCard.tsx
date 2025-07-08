import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id: number;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl mb-6 p-4 sm:p-6 md:p-8 transition-all duration-200 hover:shadow-lg hover:border-gray-300 cursor-pointer">
        {/* Author & Date */}
        <div className="flex items-center gap-2 mb-3 text-sm sm:text-base text-gray-700 flex-wrap">
          <Avatar name={authorName} />
          <span className="font-semibold truncate max-w-[100px] sm:max-w-[150px]">
            {authorName?.trim() || "Anonymous"}
          </span>
          <span className="mx-1 text-gray-300 hidden sm:inline">•</span>
          <span className="text-gray-500 text-xs sm:text-sm">{publishDate}</span>
        </div>

        {/* Title */}
        <div
          className="font-extrabold mb-2 text-lg sm:text-xl md:text-2xl break-words truncate"
          title={title}
        >
          {title}
        </div>

        {/* Content preview */}
        <div
          className="text-sm sm:text-base mb-2 text-gray-600 break-words line-clamp-2"
          title={content}
        >
          {content.slice(0, 100) + "..."}
        </div>

        {/* Read time */}
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-4">
          <svg
            className="w-4 h-4 inline-block mr-1 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {`${Math.ceil(content.length / 100)} min read`}
        </div>

        <hr />
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  const displayWord =
    name && name.trim().length > 0
      ? name.trim().split(" ")[0][0].toLocaleUpperCase()
      : "A";
  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 border border-gray-200">
      <span className="font-medium text-gray-600 dark:text-gray-300 text-base sm:text-lg">
        {displayWord}
      </span>
    </div>
  );
}

export default BlogCard;
