import express from "express";
import cors from "cors";

import db from "./database/db.js";
import router from "./routes/routes.js";


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/", router);

try {
    await db.authenticate();
    console.log("Conexion Exitosa");
} catch (error) {
    console.log(`Error: ${error}`);
}

app.get("/", (req, res) =>{
    res.send("Hola Mundo");
})

app.listen(PORT, ()=>{
    console.log("Server UP running in http://localhost:"+PORT+"/")
})

export default app;