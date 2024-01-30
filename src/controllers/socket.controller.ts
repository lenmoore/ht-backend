import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { logger } from '../logger';

export default function SocketController(socket: Socket<DefaultEventsMap>, io: Server<DefaultEventsMap>): void {
    logger.info('Client', `connected: ${socket.id}`);

    socket.on('disconnect', () => {
        logger.info('Client', `disconnected: ${socket.id}`);
    });
}
