import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/index.route";
const app=express();

app.use(express.json());
app.use(cors({
    origin: process.env.urlFrontend,
    methods:["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders:["Content-Type", "Authorization"],
    credentials:true
}));
app.use("/",router);

if (!process.env.VERCEL) {
    app.listen(process.env.port || 5000,()=>{
        console.log(`Server đang chạy ở cổng http://localhost:${process.env.port || 5000}/`);
    });
}

export default app;
