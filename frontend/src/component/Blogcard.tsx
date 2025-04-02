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
     id
}: BlogcardProps) => {

    return <Link to={`/blog/${id}`}> <div className="bg-white border-b border-slate-200 p-4 pb-4 w-screen max-w-screen-md cursor-pointer">
           <div className="flex ">
             <div className="flex justify-center flex-col"><Avatar name={authorName} /></div>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col"> {authorName}  </div>
            <div className="flex justify-center flex-col pl-2">. </div> 
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col"> {publishedDate} </div>
           </div>
           <div className="text-xl font-semibold pt-2">
            {title}
           </div>
           <div className="text-md font-thin">
            {content.slice(0, 100) + "..."}
           </div>
           <div className="text-slate-500 text-sm font-thin pt-4 ">
            {`${Math.ceil(content.length / 100)} minutes read`}
           </div> 
    </div>
    </Link>
}

export function Avatar ({name, size = "small"}: {name: string, size?: string}){
    return <div className={`relative inline-flex items-center justify-center ${size == "small" ? "w-4 h-4" : "w-9 h-9"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size== "small" ? "text-xs" : "text-base"} ${size== "small" ? "font-semibold" : "font-bold"} text-gray-600 dark:text-gray-300`}>
            {name[0].toUpperCase()}
        </span>
    </div>
}