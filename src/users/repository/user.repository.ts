import { AppDataSource } from "../../database/db";
import { User } from "../entities/user.entity";

export const UserRepository = AppDataSource.getRepository(User);