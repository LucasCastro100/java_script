
import { ButtonAuth } from "../../components/Button/auth";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/Input";

const schema = z
    .object({
        name: z
            .string()
            .nonempty("O campo nome é obrigatório!"),

        email: z
            .string()
            .email("Insira um email válido!")
            .nonempty("O campo e-mail é obrigatório!"),

        password: z
            .string()
            .min(6, "A senha deve ter no mínimo 6 caracteres!")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula!")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número!")
            .regex(/[!@#$%^&*(),.?\":{}|<>]/, "A senha deve conter pelo menos um caractere especial!")
            .nonempty("O campo senha é obrigatório!"),

        confirmPassword: z
            .string()
            .nonempty("Confirme sua senha!"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"], // erro aparece no campo de confirmação
        message: "As senhas não coincidem!",
    });

type FormData = z.infer<typeof schema>

export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    function handleRegister(data: FormData) {
        console.log(data)
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
            <div className="flex flex-col">
                <label htmlFor="name" className="font-bold">Nome</label>
                <Input type="text" name="name" error={errors.name?.message} register={register} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="font-bold">E-mail</label>
                <Input type="text" name="email" error={errors.email?.message} register={register} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="password" className="font-bold">Senha</label>
                <Input type="password" name="password" error={errors.password?.message} register={register} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="font-bold">Confirmar Senha</label>
                <Input type="password" name="confirmPassword" error={errors.confirmPassword?.message} register={register} />
            </div>

            <div className="flex flex-row gap-4 items-center justify-end">
                <Link to="/login" className="hover:underline">Já sou cadastrado!</Link>
                <ButtonAuth text="Registrar" />
            </div>
        </form>
    );
}

