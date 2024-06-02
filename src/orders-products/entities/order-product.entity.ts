import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';


@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.products)
    order: Order;

    @ManyToOne(() => Product)
    product: Product;

    @Column('int')
    quantity: number;
}
