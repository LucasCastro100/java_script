import { RegisterOptions, UseFormRegister } from "react-hook-form"

type InputProps = {
  type: string
  placeholder?: string
  name: string
  className?: string
  register: UseFormRegister<any>
  error?: string    
  rules?: RegisterOptions
}

export function Input({ type, placeholder, name, className, register, error, rules }: InputProps) {
  return (
    <div>
      <input 
        type={type} 
        placeholder={placeholder}             
        {...register(name, rules)}  
        id={name}
        className={`w-full h-10 rounded-md px-2 border-2 border-gray-950 text-gray-950 focus:border-gray-500 placeholder:text-gray-950 ${className}`}
      />

      {error && <p className="text-red-800 text-sm mt-1">{error}</p>}
    </div>
  )
}
