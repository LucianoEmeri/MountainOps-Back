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
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
const appointmentsDto_1 = require("../dtos/appointmentsDto");
// Función para retornar el arreglo completo de turnos.
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAppointments = yield data_source_1.AppointmentModel.find({ relations: ['user'] });
    return getAppointments;
});
exports.getAppointmentsService = getAppointmentsService;
// Función para obtener el detalle de un turno por ID.
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getAppointmentById = yield data_source_1.AppointmentModel.findOne({
        where: { id },
        relations: ['user'],
    });
    if (!getAppointmentById)
        throw new Error("Turno no encontrado");
    return getAppointmentById;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
// Función para crear un nuevo turno con el ID de usuario asociado.
const createAppointmentService = (date, time, description, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOne({
        where: { id: userId }
    });
    if (!user)
        throw new Error("Usuario no encontrado");
    const createAppointment = data_source_1.AppointmentModel.create({ date, time, description, status: appointmentsDto_1.Status.ACTIVE, user });
    yield data_source_1.AppointmentModel.save(createAppointment);
    return createAppointment;
});
exports.createAppointmentService = createAppointmentService;
// Función para cancelar un turno por su ID.
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cancelAppointment = yield data_source_1.AppointmentModel.findOne({
        where: { id },
        relations: { user: true },
    });
    if (!cancelAppointment)
        throw new Error("Turno no encontrado");
    cancelAppointment.status = appointmentsDto_1.Status.CANCELED;
    yield data_source_1.AppointmentModel.save(cancelAppointment);
    return cancelAppointment;
});
exports.cancelAppointmentService = cancelAppointmentService;
