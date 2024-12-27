"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const appointmentsRouter = (0, express_1.Router)();
// Endpoint para obtener todos los turnos
appointmentsRouter.get('/', appointmentsController_1.getAllAppointments);
// Endpoint para obtener un turno por su ID
appointmentsRouter.get('/:id', appointmentsController_1.getAppointmentById);
// Endpoint para crear un turno 
appointmentsRouter.post('/schedule', appointmentsController_1.createAppointment);
// Endpoint para cancelar un turno
appointmentsRouter.delete('/cancel/:id', appointmentsController_1.cancelAppointment);
exports.default = appointmentsRouter;
