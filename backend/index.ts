import express, {type Request, type Response} from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/index.route";
import { connectDatabase } from "./config/database";
const app=express();

app.use(express.json());
app.use(cors({
    origin: process.env.urlFrontend,
    methods:["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders:["Content-Type", "Authorization"],
    credentials:true
}));
app.use("/",router);
try{
    await connectDatabase();
}catch(error){
    process.exit(1);
}
app.listen(process.env.port,()=>{
    console.log(`Server đang chạy ở cổng http://localhost:${process.env.port}/`);
})
