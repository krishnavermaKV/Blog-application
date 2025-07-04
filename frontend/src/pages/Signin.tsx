import { Auth } from "../component/Auth"
import { Quote } from "../component/Quote"

export const Signin = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-screen">
            <div>
                <Auth type="signin" />
            </div>
            <div className=" hidden lg:block"> 
                  <Quote />
            </div>
        </div>
    </div>
}