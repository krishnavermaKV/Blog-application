import { Fullblog } from "../component/Fullblog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Blogskeleton } from "./Blogskeleton";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading) {
        return <div className="bg-white flex justify-center mt-32">
         <Blogskeleton />
         <Blogskeleton />
       
            </div>;
    }

    // If blog is undefined or null, show a message instead of passing it to Fullblog
    if (!blog) {
        return <div className="bg-white">Blog not found.</div>;
    }

    return (
        <div className="bg-white">
            <div>
                <Fullblog blog={blog} />
            </div>
        </div>
    );
};
