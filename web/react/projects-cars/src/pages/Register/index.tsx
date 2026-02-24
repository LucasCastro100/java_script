
import { ButtonAuth } from "../../components/Button/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/Form/Input";
import { auth } from "../../services/firebaseConection";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { RegisterFormData, registerSchema } from "../../types/Auth";
import { AuthContext } from "../../contexts/Auth";

export function Register() {
    const navigate = useNavigate()
    const { handleInfoUser }= useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

    async function handleRegister(data: RegisterFormData) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (user) => {
                await updateProfile(user.user, {
                    displayName: data.name
                }).then(() => {
                    handleInfoUser({
                        uid: user.user.uid,
                        name: data.name,
                        email: data.email
                    })
                    
                    toast.success("Usuário cadastrado com sucesso!")
                    navigate("/dashboard", { replace: true })
                }).catch(erro => {
                    toast.error("Erro ao cadastrar usuário!")
                    console.log(erro)
                })
            })
    }

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }

        handleLogout()
    }, [])

    return (
        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
            <Input type="text" name="name" error={errors.name?.message} register={register} placeholder="Digite seu nome" />

            <Input type="text" name="email" error={errors.email?.message} register={register} placeholder="Digite seu e-mail" />

            <Input type="password" name="password" error={errors.password?.message} register={register} placeholder="Digite sua senha" />

            <Input type="password" name="confirmPassword" error={errors.confirmPassword?.message} register={register} placeholder="Confirme sua senha" />

            <div className="flex flex-row gap-4 items-center justify-end">
                <Link to="/login" className="hover:underline">Já sou cadastrado!</Link>
                <ButtonAuth text="Registrar" />
            </div>
        </form>
    );
}

