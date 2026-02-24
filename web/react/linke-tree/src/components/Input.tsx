import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps){
    return(
        <input 
        className="block bg-white placeholder:text-black text-black p-2 text-base rounded-md" 
        {...props} />
    )
}