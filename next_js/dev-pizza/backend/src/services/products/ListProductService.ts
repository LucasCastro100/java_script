import { PrismaClient } from "../../generated/prisma/client";

interface ListProductProps {
  name: string;
  products: string[]
}

export class ListProductService {
  async execute({name, products}: ListProductProps) {
    try{
      console.log(name, products)
    }catch(err){
        throw new Error("Erro ao criar categoria!")
    }
  }
}
