import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import config from "../config/default";
import express from "express";

const port = process.env.PORT || config['port'] || 80;
// const port = config.get<number>('port');
console.log('PORT---->', port);
const app = express();
app.use(deserializeUser); // on every single request

app.use(express.json({limit: '1gb'}));
app.use(express.urlencoded({limit: '1gb'}));
app.use(express.json());
app.use(express.static('public'));

// app.use(
//     cors({
//         origin: [
//             'http://localhost:8080',
//             'http://127.0.0.1:5173',
//             'https://127.0.0.1:5173',
//             '*',
//         ],
//         credentials: true,
//     })
// );
// app.use(cors()); // comment this for deploy
// and do app.listen for deploy
// const key = fs.readFileSync('./localhost-key.pem');
// const cert = fs.readFileSync('./localhost.pem');
// const server = https.createServer({ key: key, cert: cert }, app);

// server.listen(port, async () => {
app.listen(port, async () => {
    logger.info('running on port ' + port);

    routes(app);
    await connect();
});
