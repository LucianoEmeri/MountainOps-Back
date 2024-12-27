import { CredentialModel } from '../config/data-source';
import ICredentialDto from '../dtos/credentialsDto';
import Credential from '../entities/Credential';

// Crear nuevas credenciales
export const createCredentialsService = async (credentialsDto: ICredentialDto): Promise<Credential> => {
    const newCredential: Credential = CredentialModel.create(credentialsDto);
    await CredentialModel.save(newCredential);
    return newCredential;
};

// Validar credenciales
export const validateCredentialsService = async (credentialsDto: ICredentialDto): Promise<number> => {
    const foundCredential: Credential | null = await CredentialModel.findOneBy({ username: credentialsDto.username });

    if (!foundCredential) {
        throw new Error("Credenciales no encontradas");
    }
    if (foundCredential.password !== credentialsDto.password) {
        throw new Error("Contraseña incorrecta");
    }
    return foundCredential.id;
};
