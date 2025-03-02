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
exports.validateCredentialsService = exports.createCredentialsService = void 0;
const data_source_1 = require("../config/data-source");
// Crear nuevas credenciales
const createCredentialsService = (credentialsDto) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = data_source_1.CredentialModel.create(credentialsDto);
    yield data_source_1.CredentialModel.save(newCredential);
    return newCredential;
});
exports.createCredentialsService = createCredentialsService;
// Validar credenciales
const validateCredentialsService = (credentialsDto) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCredential = yield data_source_1.CredentialModel.findOneBy({ username: credentialsDto.username });
    if (!foundCredential) {
        throw new Error("Credenciales no encontradas");
    }
    if (foundCredential.password !== credentialsDto.password) {
        throw new Error("Contraseña incorrecta");
    }
    return foundCredential.id;
});
exports.validateCredentialsService = validateCredentialsService;
