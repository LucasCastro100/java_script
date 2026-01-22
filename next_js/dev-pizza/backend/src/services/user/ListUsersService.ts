import { prisma } from "../../lib/prisma";

export class ListUserService {
  async execute() {
    try {
      const users = await prisma.user.findMany();

      return { msg: "Lista de usuários", data: users };
    } catch (err) {
      throw new Error("Erro ao listar usuários!");
    }
  }
}
