import {Request, Response} from 'express';
import {
    CreateVisitorInput,
    DeleteVisitorInput,
    ReadVisitorInput,
    UpdateVisitorInput,
} from '../../schema/performance/visitor.schema';

import {
    createVisitor,
    deleteVisitor,
    findAndUpdateVisitor,
    findVisitor,
    getAllVisitors,
} from '../../service/performance/visitor.service';
import {createUser} from '../../service/user.service';
import {signVisitorAccessToken} from '../../service/auth.service';
import {findAndUpdatePerformance, findPerformance,} from '../../service/performance/performance.service';
import VisitorModel from '../../models/performance/visitor.model';
import PerformanceModel from '../../models/performance/performance.model';
import GameModel from "../../models/performance/game.model";

export async function createVisitorHandler(
    req: Request<CreateVisitorInput>,
    res: Response
) {
    try {
        const user = await createUser({
            name: req.body.username,
            password: req.body.wardrobe_number,
            passwordConfirmation: req.body.wardrobe_number,
            email: req.body.email || '',
        });

        // sign an access token for the visitor; this is a default 1 day length token
        const accessToken = await signVisitorAccessToken(user);
        if (accessToken) {
            res.setHeader('x-access-token', accessToken);
        }

        const userId = user.id;

        const body = req.body;

        let visitor = await createVisitor({...body, user: userId});

        const performance = await findPerformance({
            performanceId: body.performance,
        });

        visitor = await findAndUpdateVisitor(
            {_id: visitor._id},
            {
                performance: performance,
            },
            {
                new: true,
            }
        );
        await findAndUpdatePerformance(
            {performanceId: body.performance},
            {visitors: [...performance.visitors, visitor._id]},
            {
                new: true,
            }
        );
        visitor.accessToken = accessToken; // just in case
        return res.send(visitor);
    } catch (e) {
        console.error(e);
    }
}


export async function archiveVisitorsHandler(req: Request, res: Response) {
    try {
        await archiveVisitors(req.body);
        return res.sendStatus(204);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function archiveVisitors(update: any) {
    try {
        // console.log('update:', update);
        await VisitorModel.updateMany(
            {performance: update._id},
            {archived: true}
        );
    } catch (e) {
        console.error(e);
    }
}


export async function updateVisitorHandler(
    req: Request<UpdateVisitorInput['params']>,
    res: Response
) {
    try {
        const visitorId = req.params.visitorId;
        const update = req.body;

        const visitor = await findVisitor({visitorId});

        if (!visitor) {
            return res.sendStatus(404);
        }


        const updatedVisitor = await findAndUpdateVisitor(
            {visitorId},
            {
                ...update,
            },
            {
                new: true,
            }
        );

        return res.send(updatedVisitor);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function getVisitorHandler(
    req: Request<ReadVisitorInput['params']>,
    res: Response
) {
    try {
        const visitorId = req.params.visitorId;
        const visitor = await findVisitor({visitorId});

        if (!visitor) {
            return res.sendStatus(404);
        }

        return res.send(visitor);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function getVisitorByDateNumberHandler(
    req: Request,
    res: Response
) {
    try {
        const date = new Date(req.params.date);
        const wardrobe_number = req.params.wardrobeNumber;
        // console.log(date, wardrobe_number, '<<<< trying to find this visitor');
        const performance = await PerformanceModel.findOne(
            {date: date},
            {},
            {}
        );
        // console.log('found performance: ', performance);

        const visitor = await findVisitor({
            performance: performance._id,
            wardrobe_number: wardrobe_number,
        });
        // console.log(visitor);

        return res.send(visitor);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function getVisitorByDateHandler(req: Request, res: Response) {
    try {
        console.log(req.params);
        const date = new Date(req.params.date);
        const performance = await PerformanceModel.findOne(
            {date: date},
            {},
            {}
        );
        console.log('found performance: ', performance);

        const visitors = await VisitorModel.find({
            performance: performance._id,
        });
        // console.log(visitor);

        const sortedVisitors = visitors.sort(
            (a, b) => a.wardrobe_number - b.wardrobe_number
        );
        return res.send(sortedVisitors);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

function getVisitorHighest(visitor) {
    // console.log(visitor);
    // console.log(visitor.basket);
    // console.log('-----\n', visitor.wardrobe_number);
    const basket = visitor.basket;

    const redQuiz = visitor?.quiz_results
        ? visitor?.quiz_results?.map((qR) => {
            return qR?.result_humanity_values?.fuchsia;
        })
        : [];
    const greenQuiz = visitor?.quiz_results
        ? visitor?.quiz_results?.map((qR) => {
            return qR?.result_humanity_values?.lime;
        })
        : [];
    const blueQuiz = visitor?.quiz_results
        ? visitor?.quiz_results?.map((qR) => {
            return qR?.result_humanity_values?.silver;
        })
        : [];
    const orangeQuiz = visitor?.quiz_results
        ? visitor?.quiz_results?.map((qR) => {
            return qR?.result_humanity_values?.turq;
        })
        : [];

    const redProducts = [];
    const silverProducts = [];
    const limeProducts = [];
    const turqProducts = [];
    // todo something got fucked up here idkkk.
    // redProducts = allProducts.map(
    //     (p) =>
    //         p?.humanity_values?.fuchsia?.average ||
    //         p?.humanity_values?.red?.average ||
    //         0
    // );
    // silverProducts = allProducts.map(
    //     (p) =>
    //         p?.humanity_values?.blue?.average ||
    //         p?.humanity_values?.silver?.average ||
    //         0
    // );
    // limeProducts = allProducts.map(
    //     (p) =>
    //         p?.humanity_values?.lime?.average ||
    //         p?.humanity_values?.green?.average ||
    //         0
    // );
    // turqProducts = allProducts.map(
    //     (p) =>
    //         p?.humanity_values?.turq?.average ||
    //         p?.humanity_values?.orange?.average ||
    //         0
    // );
    const fuchsia = [...redQuiz, ...redProducts];
    const lime = [...greenQuiz, ...limeProducts];
    const silver = [...blueQuiz, ...silverProducts];
    const turq = [...orangeQuiz, ...turqProducts];
    const absolute_hum_values = {
        lime: lime?.reduce((a, b) => a + b, 0),
        fuchsia: fuchsia?.reduce((a, b) => a + b, 0),
        silver: silver?.reduce((a, b) => a + b, 0),
        turq: turq?.reduce((a, b) => a + b, 0),
    };

    const sum =
        absolute_hum_values.fuchsia +
        absolute_hum_values.lime +
        absolute_hum_values.silver +
        absolute_hum_values.turq;
    const avg_hum_values = [
        {
            color: 'lime',
            value: absolute_hum_values?.lime / sum,
        },
        {
            color: 'fuchsia',
            value: absolute_hum_values?.fuchsia / sum,
        },
        {
            color: 'turq',
            value: absolute_hum_values?.turq / sum,
        },

        {
            color: 'silver',
            value: absolute_hum_values?.silver / sum,
        },
    ];
    const highest = avg_hum_values.sort((a, b) => b.value - a.value)[0].color;
    // console.log(avg_hum_values);
    // console.log(highest);
    return highest;
}


export async function getSummaryByDate(req: Request, res: Response) {
    try {
        const date = new Date(req.params.date);
        const performance = await PerformanceModel.findOne(
            {date: date},
            {},
            {}
        );
        const games = await GameModel.find().populate({
            path: 'game_steps',
        });
        console.log(games);


        const visitors = await VisitorModel.find({
            performance: performance._id,
        });


        const performanceSummary = {
            performance: performance,
            amountOfVisitors: visitors.length,
            visitors: visitors,
            games,
        };

        return res.send(performanceSummary);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function getPerformanceVisitorsHandler(
    req: Request,
    res: Response
) {
    let visitors = [];
    try {
        // console.log(req.params);
        if (req.params.performance) {
            visitors = await getAllVisitors({
                performance: req.params.performance,
            });
        } else {
            const activePerformance = await PerformanceModel.findOne({
                active: true,
            });
            visitors = await getAllVisitors({
                performance: activePerformance._id,
            });
        }

        if (!visitors) {
            return res.sendStatus(404);
        }
        return res.send(visitors);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function getVisitorsHandler(req: Request, res: Response) {
    try {
        const visitors = await getAllVisitors({});
        if (!visitors) {
            return res.sendStatus(404);
        }
        return res.send(visitors);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function deleteVisitorHandler(
    req: Request<DeleteVisitorInput['params']>,
    res: Response
) {
    try {
        // const userId = res.locals.user._id;
        const visitorId = req.params.visitorId;

        const visitor = await findVisitor({visitorId});

        if (!visitor) {
            return res.sendStatus(404);
        }

        // if (String(visitor.user) !== userId) {
        //     return res.sendStatus(403);
        // }

        await deleteVisitor({visitorId});

        return res.sendStatus(200);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}