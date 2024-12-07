import jwt from "jsonwebtoken";
import "dotenv/config";
import getUser from "./UserService.js";

const generateAccessToken = (user) => {
  return jwt.sign({ user: user.user, role: user.role }, process.env.SECRET, { expiresIn: "3h" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

let refreshTokens = [];

export const authService = async (req, res) => {
  const { user, password } = req.body

  const data = getUser(user)

  if (!data)
  return res.status(401).json({ message:"Senha ou email incorreto!"});

  const isPasswordValid = data.password === password

  if (!isPasswordValid)
  return res.status(401).json({ message:"Senha ou email incorreto!"});

  const accessToken = generateAccessToken(data);
  const refreshToken = generateRefreshToken(data);

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
};

export const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
      return res.status(401).json({ message: "Refresh token é obrigatório!" });
  }

  if (!refreshTokens.includes(token)) {
      return res.status(403).json({ message: "Refresh token inválido!" });
  }

  try {
      const user = jwt.verify(token, process.env.REFRESH_SECRET);
      const newAccessToken = generateAccessToken({ id: user.id, role: user.role });

      res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.log(err);
    
      res.status(403).json({ message: "Token inválido!" });
  }
};