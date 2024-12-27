import { Router } from 'express';
import { getAllUsers, getUserById, login, register } from '../controllers/usersController';


const usersRouter = Router();



// Endpoint para obtener todos los usuarios
usersRouter.get("/", getAllUsers);   

// Endpoint para obtener un usuario por su ID
usersRouter.get("/:id", getUserById); 

// Endpoint para registrarse
usersRouter.post("/register", register);     

// Endpoint para loguearse
usersRouter.post("/login", login);     




export default usersRouter;
