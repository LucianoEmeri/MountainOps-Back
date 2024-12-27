import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Appointment from "./Appointment";
import Credential from "./Credential";

@Entity({ name: "users" })
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    email: string;

    @Column()
    birthdate: string;

    @Column()
    nDni: string;

    @OneToOne(() => Credential, { cascade: true }) // Relación con credenciales
    @JoinColumn()
    credential: Credential;

    @OneToMany(() => Appointment, (appointment) => appointment.user) // Relación con citas
    appointments: Appointment[];
}

export default User;
