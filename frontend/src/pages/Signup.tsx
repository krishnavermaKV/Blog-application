import { Auth } from "../component/Auth"
import { Quote } from "../component/Quote"

export const Signup = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-screen">
            <div>
                <Auth type="signup" />
            </div>
            <div className=" hidden lg:block"> 
                  <Quote />
            </div>
        </div>
    </div>
}