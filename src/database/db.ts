import { DataSource } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Order } from "../orders/entities/order.entity";
import { OrderProduct } from "../orders-products/entities/order-product.entity";
import { Product } from "../products/entities/product.entity";
// import { Session } from "../sessions/entities/session.entity";



export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost", 
    port: 5432,
    username: "root",
    password: "root",
    database: "delfosti",
    logging: true,
    synchronize: true,
    entities: [
        User,
        Order,
        OrderProduct,
        // Session,
        Product,
    ],
});
