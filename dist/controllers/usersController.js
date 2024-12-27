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
exports.login = exports.register = exports.getUserById = exports.getAllUsers = void 0;
const usersService_1 = require("../services/usersService");
// Endpoint para obtener todos los usuarios
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllUsers = yield (0, usersService_1.getUsersService)();
        res.status(200).json(getAllUsers);
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
});
exports.getAllUsers = getAllUsers;
// Endpoint para obtener un usuario por su ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, usersService_1.getUserByIdService)(Number(id));
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getUserById = getUserById;
// Endpoint para registrarse
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, credential } = req.body;
        const newUser = yield (0, usersService_1.createUserService)({
            name, email, birthdate, nDni, credential
        });
        console.log("Datos recibidos en el controlador:", { name, email, birthdate, nDni, credential });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.register = register;
// Endpoint para loguearse
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, usersService_1.loginUserService)({ username, password });
        if (user) {
            res.status(200).json({
                message: 'Usuario logueado correctamente',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    // Agrega aquí cualquier otra información relevante del usuario
                },
            });
        }
        else {
            throw new Error("Credenciales incorrectas, no puede ingresar");
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.login = login;
