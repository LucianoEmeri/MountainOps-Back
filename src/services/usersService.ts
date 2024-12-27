import IUserDto from '../dtos/usersDto';
import ICredentialDto from '../dtos/credentialsDto';
import { createCredentialsService, validateCredentialsService } from './credentialsService';
import { UserModel } from '../config/data-source';
import User from '../entities/User';

// Función para retornar el arreglo completo de usuarios
export const getUsersService = async (): Promise<User[]> => {
    const getUsers: User[] = await UserModel.find(); 
    return getUsers;
};

// Función para retornar un usuario por su ID
export const getUserByIdService = async (id: number): Promise<User> => {
    const getUserById: User | null = await UserModel.findOne({
        where: { id },
    });
    if (!getUserById) {
        throw new Error("Usuario no encontrado");
    }
    return getUserById; 
};

// Función para crear un usuario
export const createUserService = async (createUserDto: IUserDto): Promise<User> => {
    const createUser = await createCredentialsService(createUserDto.credential);

    const userWithCredentials = { 
        name: createUserDto.name,
        email: createUserDto.email,
        birthdate: createUserDto.birthdate,
        nDni: createUserDto.nDni,
        credential: createUser,
    };

    const newUser = await UserModel.create(userWithCredentials);
    await UserModel.save(newUser);

    return newUser;
};

// Función para loguearse
export const loginUserService = async (credentialsDto: ICredentialDto): Promise<User | null> => {
    // Valida las credenciales y obtiene el ID de las mismas
    const credentialID: number | undefined = await validateCredentialsService(credentialsDto);

    if (!credentialID) {
        return null; // Credenciales inválidas
    }

    // Busca el usuario que tenga esa credencial
    const user = await UserModel.findOne({
        where: { credential: { id: credentialID } },
        relations: ['credential'], // Asegúrate de incluir las relaciones necesarias
    });

    return user || null; // Devuelve el usuario si se encuentra, o null si no
};
