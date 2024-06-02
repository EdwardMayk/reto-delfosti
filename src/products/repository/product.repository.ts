import { AppDataSource } from "../../database/db";
import { Product } from "../entities/product.entity";

export const ProductRepository = AppDataSource.getRepository(Product);