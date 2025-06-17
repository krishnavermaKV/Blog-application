import { Link } from "react-router-dom";

interface BlogcardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const Blogcard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogcardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 my-4 mx-auto w-full max-w-3xl hover:shadow-lg transition-all duration-200">
        {/* Author & Date */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Avatar name={authorName} size="medium" />
          <span className="ml-2 font-medium">{authorName}</span>
          <span className="mx-2">·</span>
          <span className="text-gray-400">{publishedDate}</span>
        </div>

        {/* Title */}
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </div>

        {/* Content Preview */}
        <div className="text-gray-700 text-base">
          {content.slice(0, 120) + "..."}
        </div>

        {/* Read Time */}
        <div className="text-sm text-gray-500 mt-4">
          {`${Math.ceil(content.length / 100)} min read`}
        </div>
      </div>
    </Link>
  );
};

export function Avatar({ name, size = "medium" }: { name: string; size?: "small" | "medium" | "big" }) {
  const sizeClasses =
    size === "small"
      ? "w-6 h-6 text-xs"
      : "w-8 h-8 text-sm";

  return (
    <div
      className={`flex items-center justify-center ${sizeClasses} bg-gray-200 rounded-full text-gray-800 font-semibold`}
    >
      {name[0]?.toUpperCase()}
    </div>
  );
}
