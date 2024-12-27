import { Router } from 'express';
import { getAllAppointments, getAppointmentById, createAppointment, cancelAppointment } from '../controllers/appointmentsController';


const appointmentsRouter = Router();


// Endpoint para obtener todos los turnos
appointmentsRouter.get('/', getAllAppointments);

// Endpoint para obtener un turno por su ID
appointmentsRouter.get('/:id', getAppointmentById);

// Endpoint para crear un turno 
appointmentsRouter.post('/schedule', createAppointment);

// Endpoint para cancelar un turno
appointmentsRouter.delete('/cancel/:id', cancelAppointment);



export default appointmentsRouter;
