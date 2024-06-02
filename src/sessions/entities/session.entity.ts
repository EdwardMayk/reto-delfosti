// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
// import { User } from "../../users/entities/user.entity";

// @Entity()
// export class Session {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @ManyToOne(() => User, user => user.sessions)
//     user: User;

//     @Column()
//     token: string;

//     @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
//     start_date: Date;

//     @Column({ type: "timestamp" })
//     expiration_date: Date;
// }
