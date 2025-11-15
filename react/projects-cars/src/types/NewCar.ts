import { z } from "zod";

export const newCarSchema = z.object({
    name: z.string().nonempty("O campo nome do carro é obrigatório!"),
    model: z.string().nonempty("O campo modelo é obrigatório!"),
    year: z.string().min(4, "4 digitos para ano").nonempty("O campo ano é obrigatório!"),
    km: z.string().nonempty("O campo quilometragem é obrigatório!"),
    price: z.string().min(1, "O preço deve ser maior que zero!"),
    city: z.string().nonempty("O campo cidade é obrigatório!"),    
    whatsapp: z.string().min(1, "O campo whatsapp é obrigatório!").refine((value) => /^(\d{11,12})$/.test(value), {
        message: "Insira um número válido!",
    }),
    description: z.string().nonempty("O campo descrição é obrigatório!")   
});

export type NewCarFormData = z.infer<typeof newCarSchema>;

