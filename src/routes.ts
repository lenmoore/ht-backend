import {Express, Request, Response} from 'express';
import cors from 'cors';
import {
    createUserHandler,
    getCurrentUserHandler,
} from './controller/user.controller';
import validateResource from './middleware/validateResource';
import {createUserSchema} from './schema/user.schema';
import {createSessionSchema} from './schema/session.schema';
import {
    createSessionHandler,
    refreshAccessTokenHandler,
} from './controller/auth.controller';
import requireUser from './middleware/requireUser';


import {
    createPerformanceSchema,
    deletePerformanceSchema,
    getPerformanceSchema,
    updatePerformanceSchema,
} from './schema/performance/performance.schema';
import {
    createPerformanceHandler,
    deletePerformanceHandler,
    getPerformanceHandler,
    getPerformancesHandler,
    updatePerformanceHandler,
} from './controller/performance/performance.controller';
import {
    createVisitorSchema,
    deleteVisitorSchema,
    getVisitorSchema,
    updateVisitorSchema,
} from './schema/performance/visitor.schema';
import {
    archiveVisitorsHandler,
    createVisitorHandler,
    deleteVisitorHandler,
    getPerformanceVisitorsHandler,
    getSummaryByDate,
    getVisitorByDateHandler,
    getVisitorByDateNumberHandler,
    getVisitorHandler,
    getVisitorsHandler,
    updateQuizResult,
    updateVisitorColorsHandler,
    updateVisitorHandler,
} from './controller/performance/visitor.controller';
import {
    createPhaseSchema,
    deletePhaseSchema,
    getPhaseSchema,
    updatePhaseSchema,
} from './schema/performance/phase.schema';
import {
    createPhaseHandler,
    getPhaseHandler,
    getPhasesHandler,
    updatePhaseHandler,
} from './controller/performance/phase.controller';
import {
    createGameSchema,
    deleteGameSchema,
    getGameSchema,
    updateGameSchema,
} from './schema/performance/game.schema';
import {
    createGameHandler,
    deleteGameHandler,
    getGameHandler,
    getGamesHandler,
    updateGameHandler,
} from './controller/performance/game.controller';

function routes(app: Express) {
    app.route('/').get(function (req, res) {
        res.sendFile(process.cwd() + '/index.html');
    });

    app.get('/api/health-check', cors(), (req: Request, res: Response) => {
        // console.log('yo');
        // console.log('im hot reload');
        res.sendStatus(200);
    });


    app.get('/api/users/me', getCurrentUserHandler);

    app.post(
        '/api/users',
        cors(),
        validateResource(createUserSchema),
        createUserHandler
    );

    app.options('/api/sessions', (req: Request, res: Response) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.sendStatus(204);
    });

    app.post(
        '/api/sessions',
        validateResource(createSessionSchema),
        createSessionHandler
    );

    app.post('/api/sessions/refresh', refreshAccessTokenHandler);


    // ------ performances
    app.post(
        '/api/performances',
        [requireUser, validateResource(createPerformanceSchema)],
        createPerformanceHandler
    );
    app.get('/api/performances', getPerformancesHandler);

    app.get(
        '/api/performances/:performanceId',
        validateResource(getPerformanceSchema),
        getPerformanceHandler
    );
    app.put(
        '/api/performances/:performanceId',
        [requireUser, validateResource(updatePerformanceSchema)],
        updatePerformanceHandler
    );
    app.delete(
        '/api/performances/:performanceId',
        [requireUser, validateResource(deletePerformanceSchema)],
        deletePerformanceHandler
    );
    // --- phases
    app.post(
        '/api/phases',
        [requireUser, validateResource(createPhaseSchema)],
        createPhaseHandler
    );
    app.get('/api/phases', getPhasesHandler);

    app.get(
        '/api/phases/:phaseId',
        validateResource(getPhaseSchema),
        getPhaseHandler
    );
    app.put(
        '/api/phases/:phaseId',
        [requireUser, validateResource(updatePhaseSchema)],
        updatePhaseHandler
    );
    app.delete(
        '/api/phases/:phaseId',
        [requireUser, validateResource(deletePhaseSchema)],
        deletePerformanceHandler
    );
    // --- end phases

    // --- games
    app.post(
        '/api/games',
        [requireUser, validateResource(createGameSchema)],
        createGameHandler
    );
    app.get('/api/games', getGamesHandler);

    app.get(
        '/api/games/:gameId',
        validateResource(getGameSchema),
        getGameHandler
    );
    app.put(
        '/api/games/:gameId',
        [requireUser, validateResource(updateGameSchema)],
        updateGameHandler
    );
    app.delete(
        '/api/games/:gameId',
        [requireUser, validateResource(deleteGameSchema)],
        deleteGameHandler
    );
    // --- end games

    // --- visitors
    app.post(
        '/api/visitors',
        [validateResource(createVisitorSchema)],
        createVisitorHandler
    );
    app.get(
        '/api/performance-visitors/:performance',
        getPerformanceVisitorsHandler
    );
    app.get('/api/performance-visitors', getPerformanceVisitorsHandler);
    app.get('/api/visitors', getVisitorsHandler);

    app.get(
        '/api/visitors/:visitorId',
        validateResource(getVisitorSchema),
        getVisitorHandler
    );

    app.get('/api/performance/visitors/:date', getVisitorByDateHandler);
    app.get('/api/performance/summary/:date', getSummaryByDate);

    app.put(
        '/api/performances/:id/archive-visitors',
        [requireUser],
        archiveVisitorsHandler
    );
    app.put(
        '/api/visitors/:visitorId',
        [validateResource(updateVisitorSchema)],
        updateVisitorHandler
    );

    app.put('/api/visitors-update/colors', updateVisitorColorsHandler);

    app.delete(
        '/api/visitors/:visitorId',
        [requireUser, validateResource(deleteVisitorSchema)],
        deleteVisitorHandler
    );


}

export default routes;
