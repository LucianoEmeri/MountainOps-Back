import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User"; 

@Entity({
    name: "appointments"
})
class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: string

    @Column()
    time: string

    @Column({
        default: "ACTIVE"
    })
    status: string

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.appointments)
    user: User
}

export default Appointment;
