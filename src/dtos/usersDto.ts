import ICredentialDto from "./credentialsDto";

export default class IUserDto {
    name: string;
    email: string;
    birthdate: string;
    nDni: string;
    credential: ICredentialDto;
}
