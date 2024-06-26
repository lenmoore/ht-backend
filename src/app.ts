import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as mongoose from 'mongoose';
import { logger } from '@typegoose/typegoose/lib/logSettings';
import { MONGO_URI, PORT, TRUSTED_DOMAINS } from '../config/env';


import healthCheckRoutes from './routes/health-check.route';
import mainRoutes from './routes/main.route';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/admin/user.route';
import todoRoutes from './routes/example/todo.route';
import sceneRoutes from './routes/admin/scene.route';
import taskRoutes from './routes/admin/task.route';
import performanceRoutes from './routes/admin/performance.route';
import visitorRoutes from './routes/visitor.route';
import actorRoutes from './routes/actor.route';

import auth from './extras/middlewares/auth.middleware';
import isAdmin from './extras/middlewares/is-admin.middleware';

import { resFailed } from './extras/helpers';
import path from 'node:path';

async function connectToMongo(): Promise<void> {
    console.log('connectToMongoUri', MONGO_URI);
    const connect = async () => {
        try {
            const conn = await mongoose.connect(MONGO_URI);
            const message = `MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`;
            console.info('Database', message);
        } catch (error: any) {
            console.error('Database', error.message);
            return process.exit(1);
        }
    };

    try {
        await connect();
        logger.info('connected to DB!');
    } catch (err) {
        return logger.error(err);
    }
}

const corsConfig = (): CorsOptions => ({
    origin: (origin, callback) => {
        console.log('CORS Origin:', origin); // Temporary logging
        if (TRUSTED_DOMAINS.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
});
// const limitConf = (): Partial<Options> => ({
//     windowMs: 15 * 60 * 1000,
//     standardHeaders: 'draft-7',
//     legacyHeaders: true,
//     statusCode: 429,
//     message: 'Too many requests, please try again later.',
// });


// app init
let app = express();

app.use(cors());
// app.use(rateLimit(limitConf()));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use('/videod', express.static(path.join(__dirname, '/public/videod')));
console.log('DIRECTORY= ' + path.join(__dirname, '/public/videod'));

export const jsonMiddleware = express.json({ limit: '500mb' });
// add routes by module
app.use('/api', jsonMiddleware, mainRoutes);
app.use('/api/health-check', jsonMiddleware, healthCheckRoutes);
app.use('/api/auth', jsonMiddleware, authRoutes);
app.use('/api/admin/users', jsonMiddleware, auth, isAdmin, userRoutes);
app.use('/api/admin/scenes', jsonMiddleware, auth, isAdmin, sceneRoutes);
app.use('/api/admin/tasks', jsonMiddleware, auth, isAdmin, taskRoutes);
app.use('/api/admin/performances', jsonMiddleware, auth, isAdmin, performanceRoutes);
app.use('/api/visitor', auth, visitorRoutes);
app.use('/api/actor', jsonMiddleware, auth, actorRoutes);
app.use('/api/todos', jsonMiddleware, auth, todoRoutes);
app.use((_, res) => resFailed(res, 404, 'Path Not Found. Please go to /api'));
app.use((_, res) => resFailed(res, 500, 'Shithouse'));

// Serve static files


logger.info(PORT);
// use this for aws
app.listen(PORT, async () => {
    console.log('running on port ' + PORT);

    await connectToMongo();
});

// const serverOptions = {
//     key: fs.readFileSync(path.resolve(__dirname, '../../certificates/server.key')),
//     cert: fs.readFileSync(path.resolve(__dirname, '../../certificates/server.cert')),
// };
//
// https.createServer(serverOptions, app).listen(PORT, () => {
//     console.log(`ExpressJS server running on https://localhost:${PORT}`);
//     connectToMongo();
// });