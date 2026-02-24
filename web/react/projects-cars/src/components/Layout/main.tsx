import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

export function LayoutMain() {
    return (
        <div className="flex bg-gray-950 min-h-screen text-white">
            <ToastContainer closeOnClick newestOnTop pauseOnHover={false} theme="colored" transition={Bounce}/>

            <Outlet />
        </div>
    );
}