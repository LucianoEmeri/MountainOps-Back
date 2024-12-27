import { AppointmentModel, UserModel } from '../config/data-source';
import  { Status } from '../dtos/appointmentsDto';
import Appointment from '../entities/Appointment';

// Función para retornar el arreglo completo de turnos.
export const getAppointmentsService = async (): Promise<Appointment[]> => {
    const getAppointments = await AppointmentModel.find({ relations: ['user'] });
    return getAppointments;
};

// Función para obtener el detalle de un turno por ID.
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const getAppointmentById = await AppointmentModel.findOne({
        where: { id },
        relations: ['user'],
    });
    if (!getAppointmentById) throw new Error("Turno no encontrado");
    return getAppointmentById;
};

// Función para crear un nuevo turno con el ID de usuario asociado.
export const createAppointmentService = async (date: string, time: string, description: string, userId: number): Promise<Appointment> => {
    const user = await UserModel.findOne({
        where: { id: userId }
    });
    if (!user) throw new Error("Usuario no encontrado");

    const createAppointment = AppointmentModel.create({ date, time, description, status: Status.ACTIVE, user });
    await AppointmentModel.save(createAppointment);

    return createAppointment;
};

// Función para cancelar un turno por su ID.
export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    const cancelAppointment = await AppointmentModel.findOne({
        where: { id },
        relations: { user: true },
    });
    if (!cancelAppointment) throw new Error("Turno no encontrado");

    cancelAppointment.status = Status.CANCELED;
    await AppointmentModel.save(cancelAppointment);

    return cancelAppointment;
};
