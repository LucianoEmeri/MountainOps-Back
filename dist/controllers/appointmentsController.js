"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.createAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
// Endpoint para obtener todos los turnos
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAppointments = yield (0, appointmentsService_1.getAppointmentsService)();
        res.status(200).json(getAppointments);
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los turnos" });
    }
});
exports.getAllAppointments = getAllAppointments;
// Endpoint para obtener un turno por su ID
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getAppointmentById = yield (0, appointmentsService_1.getAppointmentByIdService)(Number(id));
        res.status(200).json(getAppointmentById);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAppointmentById = getAppointmentById;
// Endpoint para crear un turno 
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, description, userId } = req.body;
        const createAppointment = yield (0, appointmentsService_1.createAppointmentService)(date, time, description, userId);
        res.status(200).json(createAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createAppointment = createAppointment;
// Endpoint para cancelar un turno
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const canceledAppointment = yield (0, appointmentsService_1.cancelAppointmentService)(Number(id));
        res.status(200).json(canceledAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.cancelAppointment = cancelAppointment;
