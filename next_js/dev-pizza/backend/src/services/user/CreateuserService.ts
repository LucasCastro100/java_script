import { hash } from "bcryptjs";
import { prisma } from "../../lib/prisma";


interface CreateUserProps{
    name: string
    email: string
    password: string
}

export class CreateUserService{
    async execute({name, email, password}: CreateUserProps){

        const userAlreadyExists = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("Usuário já existente!")
        }

        const passwordHash = await hash(password, 8)
        
        const user = await prisma.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true                
            }
        })
        
        return user
    }
}