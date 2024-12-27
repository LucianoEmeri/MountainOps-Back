"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const usersRouter = (0, express_1.Router)();
// Endpoint para obtener todos los usuarios
usersRouter.get("/", usersController_1.getAllUsers);
// Endpoint para obtener un usuario por su ID
usersRouter.get("/:id", usersController_1.getUserById);
// Endpoint para registrarse
usersRouter.post("/register", usersController_1.register);
// Endpoint para loguearse
usersRouter.post("/login", usersController_1.login);
exports.default = usersRouter;
