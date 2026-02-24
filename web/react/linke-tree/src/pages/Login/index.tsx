import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";

import { auth } from '../../services/firebaseConection'
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const navigate = useNavigate()

  function handleForm(e: FormEvent) {
    e.preventDefault()

    if (email === "" || pass === "") {
      alert('Os campos devem ser preenchidos!')
      return
    }

    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        navigate('/admin', {replace: true})
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('Usuário não encontrado!')
        } else if (error.code === 'auth/wrong-password') {
          alert('Senha incorreta!')
        } else {
          alert('Erro ao tentar fazer login!')
        }
        console.log(error)
      })
  }

  return (
    <div className="flex flex-col gap-4 bg-black p-4 items-center justify-center h-screen">
      <div className="rounded-md border-2 border-white p-8 bg-gradient-to-r from-white/20 via-white/20 to-white/20 backdrop-blur-lg shadow-xl ring-1 ring-white/20">
        <div className="text-center">
          <Link to={'/'} className="font-bold text-4xl"><span className="text-yellow-700">Dev</span><span className="text-blue-500">Link</span></Link>
        </div>

        <div className="w-full md:w-[400px] mt-8">
          <form onSubmit={handleForm} className="flex flex-col gap-4">
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />

            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Digite sua senha"
            />

            <div className="text-end">
              <button type="submit" className="py-2 px-4 text-white font-bold bg-blue-400 hover:bg-blue-800 rounded-md">Acessar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}