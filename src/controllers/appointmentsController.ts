import { Request, Response } from 'express';
import IAppointmentDto, { Status } from '../dtos/appointmentsDto';
import { getAppointmentsService, getAppointmentByIdService, createAppointmentService, cancelAppointmentService } from '../services/appointmentsService';
import Appointment from '../entities/Appointment';

// Endpoint para obtener todos los turnos
export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const getAppointments: Appointment[] = await getAppointmentsService();
        res.status(200).json(getAppointments);
    } catch (error) {
        res.status(400).json({ error: "Error al obtener los turnos" });
    }
};

// Endpoint para obtener un turno por su ID
export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const getAppointmentById: Appointment = await getAppointmentByIdService(Number(id));
        res.status(200).json(getAppointmentById);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Endpoint para crear un turno 
export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { date, time, description, userId }: IAppointmentDto = req.body;
        const createAppointment: Appointment = await createAppointmentService(date, time, description, userId);
        res.status(200).json(createAppointment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Endpoint para cancelar un turno
export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const canceledAppointment: Appointment = await cancelAppointmentService(Number(id));
        res.status(200).json(canceledAppointment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
