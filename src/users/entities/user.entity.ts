import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../../utils/enum/user-role.enum';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    employee_code: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    position: string;

    @Column({
        type: 'enum',
        enum: UserRole
    })
    role: UserRole;
}
