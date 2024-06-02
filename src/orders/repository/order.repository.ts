import { AppDataSource } from "../../database/db";
import { Order } from "../entities/order.entity";

export const OrderRepository = AppDataSource.getRepository(Order);