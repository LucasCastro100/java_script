import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
    .string("O nome precisa ser um texto")
    .min(3, "O nome precisa ter no minimo 3 letras"),

    email: z
    .email("Precisa ser um email valido"),

    password: z
    .string("A senha é obrigatoria")
    .min(6, "A senha precisa ter no minimo 6 caracteres"),
  }),
});
