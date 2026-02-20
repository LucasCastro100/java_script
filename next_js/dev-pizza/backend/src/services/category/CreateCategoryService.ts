import { PrismaClient } from "../../generated/prisma/client";

interface CreateCategoryProps {
  name: string;
}

export class CreateCategoryService {
  async execute({name}: CreateCategoryProps) {
    try{
        console.log(name)
    }catch(err){
        throw new Error("Erro ao criar categoria!")
    }
  }
}
