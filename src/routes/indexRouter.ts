import { Router } from 'express';
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";


const indexRouter = Router();



// Endpoint para usuarios
indexRouter.use("/users", usersRouter);       

// Endpoint para turnos
indexRouter.use("/appointments", appointmentsRouter);  




export default indexRouter;
