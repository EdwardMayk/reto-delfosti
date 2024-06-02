import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./auth/routes/auth.router";
import orderRoutes from "./orders/routes/order.router";
import { setupSwagger } from './swagger';

const app: Application = express();

app.set("port", process.env.PORT || 4000);

app.use(morgan("dev")); 
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
}); 



app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);


setupSwagger(app);


export default app;

