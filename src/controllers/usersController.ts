import { Request, Response } from 'express';
import IUserDto from '../dtos/usersDto';
import { 
    createUserService, 
    getUsersService, 
    getUserByIdService, 
    loginUserService 
} from '../services/usersService';

// Endpoint para obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const getAllUsers = await getUsersService();
        res.status(200).json(getAllUsers);
    } catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
};

// Endpoint para obtener un usuario por su ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(Number(id));
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Endpoint para registrarse
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, birthdate, nDni, credential }: IUserDto = req.body;
        const newUser = await createUserService({
            name, email, birthdate, nDni, credential
        });
        console.log("Datos recibidos en el controlador:", { name, email, birthdate, nDni, credential });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Endpoint para loguearse
export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await loginUserService({ username, password });

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
        } else {
            throw new Error("Credenciales incorrectas, no puede ingresar");
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
