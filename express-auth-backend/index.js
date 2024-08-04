import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import signupRoute from './routes/signup/signup.route.js'
import loginRoute from './routes/login/login.route.js';
import authChckerRoute from './routes/auth/authChecker.route.js';
import { prisma } from './prisma/prisma.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import fs from 'fs'

//import generate from './utils/jwt.generator.js'

dotenv.config()

console.log(process.env.JWT_SECRET)

const app = express()

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


// app.use(morgan('tiny'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 8081


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + "/out"))

app.get('*', (req, res) => {
    const pathPrefix = req.path;
    
    let filePath = path.join(__dirname, 'out', req.path, 'index.html');

    if(pathPrefix !== "") {
        filePath = path.join(__dirname, 'out', `${req.path}.html`);
    }

  
    // Check if the requested file 
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendFile(path.join(__dirname, 'out', 'index.html'));
    }
  });

app.use('/api/signup', signupRoute)
app.use('/api/login', loginRoute)
app.use('/api/check-auth', authChckerRoute)

app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.info("database connected");
        //await generate();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error.message);
    }
})
