import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";
import { preloadData } from "./helpers/preloadData";

AppDataSource.initialize()
    .then (res => {
        console.log("Conexión a la base de datos realizada con éxito");
        // preloadData()
                server.listen(PORT, () => {
                    console.log(`Servidor escuchando en el PUERTO ${PORT}`);
                })
        })

    .catch(error => {
        throw Error("Falló la conexión al servidor" + error)
    }) 
