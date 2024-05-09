import express, { json, urlencoded } from 'express'
import dotenv from "dotenv";
import auth from './routes/auth';

dotenv.config();

const app = express()

app.use(json())
app.use(urlencoded({extended : true}))

app.use(auth)


export default app