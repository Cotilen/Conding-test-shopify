import express from "express";
import dotenv from "dotenv";
import OrdersRoutes from './routes/OrdersRoutes.js'

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", OrdersRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
}

export default app;
