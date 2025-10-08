import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Social } from "./Social";

export function Footer() {
    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            <Social url="/"> <FaYoutube size={30}/> </Social>
            <Social url="/"> <FaInstagram size={30}/> </Social>
            <Social url="/"> <FaFacebookF size={30}/> </Social>
        </div>
    )
}