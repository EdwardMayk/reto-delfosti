import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryColumn()
    sku: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    tags: string;

    @Column('decimal')
    price: number;

    @Column()
    unit_of_measure: string;
}
