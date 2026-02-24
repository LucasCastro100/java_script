import { PrismaClient } from "../../generated/prisma/client";

interface CreateProductProps {
  name: string;
}

export class CreateProductService {
  async execute({name}: CreateProductProps) {
    try{
        console.log(name)
    }catch(err){
        throw new Error("Erro ao criar categoria!")
    }
  }
}
