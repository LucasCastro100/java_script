import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório!"),
  email: z.string().email("Insira um email válido!").nonempty("O campo e-mail é obrigatório!"),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres!")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula!")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número!")
    .regex(/[!@#$%^&*(),.?\":{}|<>]/, "A senha deve conter pelo menos um caractere especial!")
    .nonempty("O campo senha é obrigatório!"),
  confirmPassword: z.string().nonempty("Confirme sua senha!"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "As senhas não coincidem!",
});

export const loginSchema = z.object({
  email: z.string().email("Insira um email válido!").nonempty("O campo email é obrigatório!"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres!").nonempty("O campo senha é obrigatório!"),
});

// Types inferidos
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
