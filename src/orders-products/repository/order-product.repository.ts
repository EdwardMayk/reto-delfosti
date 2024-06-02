import { AppDataSource } from "../../database/db";
import { OrderProduct } from "../entities/order-product.entity";

export const OrderProductRepository = AppDataSource.getRepository(OrderProduct);