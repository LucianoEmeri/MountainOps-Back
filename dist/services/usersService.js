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
exports.loginUserService = exports.createUserService = exports.getUserByIdService = exports.getUsersService = void 0;
const credentialsService_1 = require("./credentialsService");
const data_source_1 = require("../config/data-source");
// Función para retornar el arreglo completo de usuarios
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const getUsers = yield data_source_1.UserModel.find();
    return getUsers;
});
exports.getUsersService = getUsersService;
// Función para retornar un usuario por su ID
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getUserById = yield data_source_1.UserModel.findOne({
        where: { id },
    });
    if (!getUserById) {
        throw new Error("Usuario no encontrado");
    }
    return getUserById;
});
exports.getUserByIdService = getUserByIdService;
// Función para crear un usuario
const createUserService = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const createUser = yield (0, credentialsService_1.createCredentialsService)(createUserDto.credential);
    const userWithCredentials = {
        name: createUserDto.name,
        email: createUserDto.email,
        birthdate: createUserDto.birthdate,
        nDni: createUserDto.nDni,
        credential: createUser,
    };
    const newUser = yield data_source_1.UserModel.create(userWithCredentials);
    yield data_source_1.UserModel.save(newUser);
    return newUser;
});
exports.createUserService = createUserService;
// Función para loguearse
const loginUserService = (credentialsDto) => __awaiter(void 0, void 0, void 0, function* () {
    // Valida las credenciales y obtiene el ID de las mismas
    const credentialID = yield (0, credentialsService_1.validateCredentialsService)(credentialsDto);
    if (!credentialID) {
        return null; // Credenciales inválidas
    }
    // Busca el usuario que tenga esa credencial
    const user = yield data_source_1.UserModel.findOne({
        where: { credential: { id: credentialID } },
        relations: ['credential'], // Asegúrate de incluir las relaciones necesarias
    });
    return user || null; // Devuelve el usuario si se encuentra, o null si no
});
exports.loginUserService = loginUserService;
