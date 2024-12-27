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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadData = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = __importDefault(require("../entities/User"));
const user1 = {
    id: 1,
    name: "Luciano Emeri",
    email: "emeriluciano@gmail.com",
    birthdate: "1999-04-16",
    nDni: "41698321",
};
const preloadData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield data_source_1.UserModel.find();
        if (users.length)
            return console.log("No se hizo la precarga de datos porque ya hay datos");
        const newUser1 = transactionalEntityManager.create(User_1.default);
        yield transactionalEntityManager.save(newUser1);
        console.log("Precarga de datos realizada con éxito");
    }));
});
exports.preloadData = preloadData;
