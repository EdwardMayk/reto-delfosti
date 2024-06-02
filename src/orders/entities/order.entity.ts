import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderProduct } from '../../orders-products/entities/order-product.entity';


export enum OrderStatus {
    PENDING = 'Pending',
    IN_PROCESS = 'In Process',
    IN_DELIVERY = 'In Delivery',
    RECEIVED = 'Received'
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_number: number;

    @Column({ type: 'date' })
    order_date: string;

    @Column({ type: 'date', nullable: true })
    reception_date: string;

    @Column({ type: 'date', nullable: true })
    dispatch_date: string;

    @Column({ type: 'date', nullable: true })
    delivery_date: string;

    @ManyToOne(() => User)
    seller: User;

    @ManyToOne(() => User, { nullable: true })
    delivery_person: User;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
    products: OrderProduct[];
}
