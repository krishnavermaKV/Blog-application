import { Appbar } from "../component/Appbar"
import { Blogcard } from "../component/Blogcard"
import { useBlogs } from "../hooks"
import { Blogskeleton } from "./Blogskeleton";



export const Blogs = () => {
    const {loading, blogs} = useBlogs();
     if(loading){
        return <div className="bg-white mt-24 gap-4  ">
            <div className="mt-10 max-w-screen-lg w-full">      <Blogskeleton /></div>
            <div className="mt-10 max-w-screen-lg w-full">      <Blogskeleton /></div>
            <div className="mt-10 max-w-screen-lg w-full">      <Blogskeleton /></div>
            <div className="mt-10 max-w-screen-lg w-full">      <Blogskeleton /></div>
            <div className="mt-10 max-w-screen-lg w-full">      <Blogskeleton /></div>
        </div>
     }
    return <div className=" bg-white">
        <Appbar />
        <div className="flex justify-center">
        <div className=" ">
        {blogs.map(blog => (
          <Blogcard
        key={blog.id || Math.random()} // Use blog.id, fallback to Math.random() if missing
        id={blog.id}
        authorName={blog.author?.name || "Unknown Author"}
        title={blog.title}
        content={blog.content}
        publishedDate={"2nd Feb 2022"}
    />
))}

    </div>
    </div>
    </div>
}
