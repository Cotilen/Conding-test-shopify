import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OrdersRoutes from './routes/OrdersRoutes.js'
import AuthRoutes from './routes/AuthRoutes.js'

dotenv.config();
const app = express();

app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS'
}

app.use(cors(corsOptions))

app.use("/api", AuthRoutes);
app.use("/api", OrdersRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
}

export default app;
