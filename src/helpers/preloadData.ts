import { AppDataSource, UserModel } from "../config/data-source";
import User from '../entities/User';

const user1 = {
    id: 1,
    name: "Luciano Emeri",
    email: "emeriluciano@gmail.com",
    birthdate: "1999-04-16",
    nDni: "41698321",
}

export const preloadData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        const users = await UserModel.find();
        
        if(users.length) return console.log("No se hizo la precarga de datos porque ya hay datos")

        const newUser1 = transactionalEntityManager.create(User);

        await transactionalEntityManager.save(newUser1);

        console.log("Precarga de datos realizada con éxito");
    });
}
