import { Link } from "react-router-dom"
import { Avatar } from "./Blogcard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-3">
        <Link to={"/blogs"} >
   <div className=" flex flex-col justify-center cursor-pointer font-bold text-lg mt-2">
    Medium
   </div>
   </Link>
   <div className="flex ">
   <div>
    <Link to={"/publish"}>
    <button type="button" className="mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2">
        New
    </button>
    </Link>
    </div>
    <div className="mt-1"> <Avatar size={"big"} name="krishna" /></div>
   </div>
    </div>
}