import axios from "axios"
import { Appbar } from "../component/Appbar"
import { Backend_Url } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const navigate = useNavigate();
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");

    async function handler(){
      const response = await axios.post(`${Backend_Url}/api/v1/blog`, {
            title: title,
            content: content
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        navigate(`/blog/${response.data.id}`)
        return 
    }

    return <div className="bg-white">
           <Appbar />
           <div className="flex justify-center w-full bg-white">
     
       <div className="max-w-screen-lg w-full pt-8">
        <label  className="block mb-2  text-sm font-medium text-gray-900 ">Write Your blog Here</label>
        <input type="text" onChange={(e) => settitle(e.target.value)} className="bg-gray-50 border border-grayy-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title"></input>
        <div>
        <div>
       <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-200 dark:border-gray-100  mt-5">
           <div className=" bg-white rounded-t-lg dark:bg-gray-200">
               <label  className="sr-only">Your comment</label>
               <textarea id="comment" onChange={(e) => setcontent(e.target.value)} rows={8} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-100 focus:ring-0 dark:text-black dark:placeholder-gray-400" placeholder="  Content...." required ></textarea>
           </div>
           <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
               <button type="submit" onClick={handler} className="inline-flex items-center py-2.5 px-6 text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Publish Blog
               </button>
               <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                   <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                       <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                            <path stroke="currentColor"  strokeWidth="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                        </svg>
                       <span className="sr-only">Attach file</span>
                   </button>
                   <button onClick={handler}
                    type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                       <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                        </svg>
                       <span className="sr-only">Set location</span>
                   </button>
                   <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                       <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                       <span className="sr-only">Upload image</span>
                   </button>
               </div>
           </div>
       </div>
       </div>
    <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
    </div>
    </div>
    </div>
    </div>
}