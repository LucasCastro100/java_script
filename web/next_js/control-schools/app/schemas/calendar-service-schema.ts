// schema.ts
import * as z from "zod"

export const calendarServiceFormSchema = z.object({
    titulo: z.string().min(1, "O título é obrigatório"),
    descricao: z.string().optional(),
    horario: z.string().min(1, "Horário é obrigatório"),
})

// Exportamos o tipo para usar no componente sem precisar redefinir
export type calendarServiceFormSchemaValues = z.infer<typeof calendarServiceFormSchema>