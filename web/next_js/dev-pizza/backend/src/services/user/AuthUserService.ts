import { compare } from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { sign } from "jsonwebtoken";

interface AuthUserServiceProps {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    try {
      // Verificar se o usuário existe
      const userExist = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!userExist) {
        throw new Error("Email ou senha inválidos!");
      }

      // Verificar se a senha está correta
      const passwordMatch = await compare(password, userExist.password);

      if (!passwordMatch) {
        throw new Error("Email ou senha inválidos!");
      }

      // Gerar o token JWT
      const token = sign(
        {
          name: userExist.name,
          email: userExist.email,
        },
        process.env.JWT_SECRET as string,
        {
          subject: userExist.id,
          expiresIn: "7d",
        }
      );

      return {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
        token: token,
      };
    } catch (err) {
      throw new Error("Erro ao autenticar usuário!");
    }
  }
}
