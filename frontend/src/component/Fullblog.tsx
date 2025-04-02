import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Blogcard"

export const Fullblog = ({blog}: {blog:Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
         <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-200 pt-12">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                  {blog.title}
                </div>
                <div className="text-slate-500 pt-2">
                    Post on 20 December 2024
                </div>
                <div className="pt-4 text-lg">
                    {blog.content}
                </div>
           </div>
           <div className="col-span-4">
            <div className="text-slate-600 text-lg">
            Author
            </div>
            <div className="flex w-full mt-4">
                <div className="pr-4 flex flex-col justify-center">
                <Avatar size={"big"} name={blog.author.name || "Unkonow"} />
                </div>
              <div>
              <div className="text-xl font-bold">
                        {blog.author.name ||"Unknown"}
                    </div>
                    <div className="pt-2 text-slate-500">
                        Random catch phrase about the auuthors ability to grab the users  attention
                    </div>
              </div>
            </div>
           </div>
        </div>
        </div>
    </div>
}