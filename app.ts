import  config from "./src/configs/config";
import connect from "./src/utils/database";
import globalRoutes from "./src/globalRoutes";
import errorMiddleware from "./src/middlewares/error.middleware";
import corsMiddleware from "./src/middlewares/cors.middleware"
import bodyParser from "body-parser";
import {app , server } from "./src/socket/socket";


app.use(bodyParser.json());

app.use(corsMiddleware);
app.use(globalRoutes);
app.use(errorMiddleware);

server.listen(config.port,async ()=>{
await connect()
console.log(`Connected to port ${config.port}`)
})
