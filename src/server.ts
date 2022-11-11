import express, { Express } from "express";
import path from "path";
import dbConnection from "./lib/db";
import userRouter from "./router/user";
import photoRouter from "./router/photo";
import commentRouter from "./router/comment";
import likeRouter from "./router/like";


let app: Express = express();
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'src', 'uploades')));
dbConnection();

app.use(userRouter);
app.use(photoRouter);
app.use(commentRouter);
app.use(likeRouter);


app.listen(5000, () => console.log("server readey 5000"));


