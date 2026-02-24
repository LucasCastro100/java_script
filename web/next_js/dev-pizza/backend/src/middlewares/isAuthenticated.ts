import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

   if (!authToken) {
    return res.status(401).json({
      error: "Token inválido",
    });
  }

  const [, token] = authToken.split(" ");
  console.log(authToken)  

  try {
    const { sub } = verify(token!, process.env.JWT_SECRET as string) as PayLoad;

    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
};
