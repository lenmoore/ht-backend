import config from 'config';
import mongoose from 'mongoose';
import logger from './logger';

async function connect() {
    let dbUri = '';
    dbUri = config.get<string>('dbUri');
    console.log(dbUri);
    mongoose.set('strictQuery', true);
    try {
        await mongoose
            .connect(dbUri);
        logger.info('connected to db');
    } catch (err) {
        return logger.error(err);
    }
}

export default connect;
