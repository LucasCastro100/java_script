
import { ButtonAuth } from "../../components/Button/auth";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

const schema = z.object({
    email: z.string()
    .email("Insira um email válido!")
    .nonempty("O campo email é obrigatório!"),

    senha: z.string()
    .nonempty("o campo senha é obrigatório!")
})

type FormData = z.infer<typeof schema>

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    function handleLogin(data: FormData) {
        console.log(data)
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <Input type="text" name="email" placeholder="Digite seu melhor e-mail" error={errors.email?.message} register={register} />

            <Input type="password" name="senha" placeholder="Digite sua melhor senha" error={errors.senha?.message} register={register} />

            <div className="flex flex-row gap-4 items-center justify-end">
                <Link to="/register" className="hover:underline">Não tenho cadastro!</Link>
                <ButtonAuth text="Acessar" />
            </div>
        </form>
    );
}