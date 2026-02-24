import { PrismaClient } from "../../generated/prisma/client";

interface ListCategoryProps {
  name: string;
  products: string[]
}

export class ListCategoryService {
  async execute({name, products}: ListCategoryProps) {
    try{
      console.log(name, products)
    }catch(err){
        throw new Error("Erro ao criar categoria!")
    }
  }
}
