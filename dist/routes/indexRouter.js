"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter_1 = __importDefault(require("./usersRouter"));
const appointmentsRouter_1 = __importDefault(require("./appointmentsRouter"));
const indexRouter = (0, express_1.Router)();
// Endpoint para usuarios
indexRouter.use("/users", usersRouter_1.default);
// Endpoint para turnos
indexRouter.use("/appointments", appointmentsRouter_1.default);
exports.default = indexRouter;
