import { Request, Response } from 'express';
import VisitorModel from '../../models/performance/visitor.model';
import PerformanceModel from '../../models/performance/performance.model';
import ActorStateModel from '../../models/performance/actor-schema.model';

export async function getActorStateAudienceListHandler(
    req: Request,
    res: Response,
) {
    try {
        const actorColor = req.query.colour;
        // console.log(actorColor, ' get actor state -> visitors summary');
        const activePerformance = await PerformanceModel.find({ active: true });

        const filter: any = {};
        filter.performance = activePerformance;
        if (actorColor !== 'all') {
            filter.confirmed_humanity_value = actorColor;
        }
        const actorColorVisitors = await VisitorModel.find(filter)
            .populate({
                path: 'basket',
                populate: {
                    path: 'products',
                },
            })
            .populate({ path: 'quiz_results', populate: { path: 'step' } });

        return res.send(actorColorVisitors);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function getActorStateHandler(
    req: Request,
    res: Response,
) {
    try {
        const actorColour = req.query.colour;
        // console.log(actorColour);

        const actorState = await ActorStateModel.findOne({});
        if (actorColour !== 'all') {
            // console.log('idk, todo return actor phases. i guess not necessary');
        }

        return res.send(actorState);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function createActorStateHandler(
    req: Request,
    res: Response,
) {
    try {
        const body = req.body;

        const result = await ActorStateModel.create(body);

        return res.send(result);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function updateActorStateHandler(
    req: Request,
    res: Response,
) {
    try {
        // console.log(req.body);
        const actorColorVisitors = await ActorStateModel.findOneAndUpdate(
            {},
            req.body,
        );

        return res.send(actorColorVisitors);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}
