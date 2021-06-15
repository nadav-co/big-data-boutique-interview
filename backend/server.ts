import { Request, Response } from "express";

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import expressSession from 'express-session'


const app = express()
const http = require('http').createServer(app)

const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

app.use(bodyParser.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const meetingRoutes = require('./api/meeting/meeting.routes')
const occupationRoutes = require('./api/occupation/occupation.routes')
const manager = require('./api/manager/manager.routes')


app.use('/api/meeting', meetingRoutes)
app.use('/api/occupation', occupationRoutes)
app.use('/api/manager', manager)


app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
})
