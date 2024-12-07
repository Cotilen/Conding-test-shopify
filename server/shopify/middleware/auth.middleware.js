import "dotenv/config";
import jwt from "jsonwebtoken";
import getUser from "../services/UserService.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;  
  if (!authHeader)
    return res.status(401).send({ message: "O token não foi informado!" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2)
    return res.status(401).send({ message: "Token inválido!" });

  const [scheme, token] = parts;


  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: "Erro no token!" });

  console.log(token);
  
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token expirado!" });
      }
      return res.status(401).send({ message: "Token inválido!" });
    }

    try {
      const user = getUser(decoded.user)
      if (!user || !user.id)
        return res.status(401).send({ message: "Usuário não encontrado!" });

      req.userId = user.id;
      req.userRole = user.role;
      return next();
    } catch (error) {
      console.log(error);
      
      return res.status(500).send({ message: "Erro interno no servidor!" });
    }
  });
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
      if (!roles.includes(req.userRole)) {
          return res.status(403).json({ error: 'Acesso negado' });
      }
      next();
  };
}