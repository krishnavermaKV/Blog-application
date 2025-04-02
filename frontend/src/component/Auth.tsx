import { SignupInput } from "@pkriya/blogapp-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { Backend_Url } from "../config";
 
export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
   async function sendRequest(){
    try{
        const response = await axios.post(`${Backend_Url}/api/v1/user/${type == "signup" ? "signup" : "signin"}`, postInputs);
        const {jwt} = response.data;
        localStorage.setItem("token", jwt);
        navigate("/blogs");
    }
    catch(e){
        //alert the user herre the request failed
    }
    }
    return <div className="h-screen flex justify-center flex-col bg-white">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
            <div className="text-2xl font-extrabold">
                Create an account
             </div>
             <div className="text-slate-500">
                {type == "signin" ? "Don't have an account" : "Already have an account?"}
                <Link to={type == "signin" ? "/signup": "/signin"} className="pl-2 underline"> 
                {type == "signin" ? "Sign up" : "Login"}</Link>
             </div>
            </div>
            <div className="pt-4">
           {type == "signup" ? <LabelledInput label={"Name"} type={"name"} placeholder={"Krishna Verma..."} onChange={(e) => {
            setPostInputs(c => ({
                ...c,
                name: e.target.value
            })) 
         }} /> : null
           } 
                 <LabelledInput label={"E-mail"} type={"email"} placeholder={"Krish@gmail.com"} onChange={(e) => {
            setPostInputs(c => ({
                ...c,
                email: e.target.value
            })) 
         }} />
                 <LabelledInput label={"Password"} type={"password"} placeholder={"fla#@3458f."} onChange={(e) => {
            setPostInputs(c => ({
                ...c,
                password: e.target.value
            })) 
         }} />
         <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  text-md px-5 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
             {type == "signup"? "Sign up": "Sign in"}
         </button>
              </div>
        </div>
        </div>
    </div>
}

interface LabelledinputType {
     label: string,
     placeholder: string,
     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
     type?: string
}
function LabelledInput({label, placeholder, onChange, type}: LabelledinputType){
        return <div>
            <div className="text-sm font-medium text-left py-2 outline-black">
                {label}
            </div>
            <input onChange={onChange} type={type || "text"} placeholder={placeholder} className="w-full px-2 py-2  rounded border border-black focus:outline-none focus:ring-1 focus:ring-black focus:bg-slate-200 bg-slate-100" />
        </div>
    }