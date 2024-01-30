import { array, boolean, object, optional, string, TypeOf } from 'zod';

const payload = {
    body: object({}),
};

const params = {
    params: object({
        visitorId: optional(string({})),
        basket: optional(
            object({
                basket_id: string(),
            }),
        ),
        quiz_results: optional(array(object({}))),
        performance: optional(
            object({
                performance_id: string(),
            }),
        ),
        archived: optional(boolean()),
    }),
};

export const createVisitorSchema = object({
    ...payload,
});

export const updateVisitorSchema = object({
    ...payload,
    ...params,
});

export const deleteVisitorSchema = object({
    ...params,
});

export const getVisitorSchema = object({
    ...params,
});

export type CreateVisitorInput = TypeOf<typeof createVisitorSchema>;
export type UpdateVisitorInput = TypeOf<typeof updateVisitorSchema>;
export type ReadVisitorInput = TypeOf<typeof getVisitorSchema>;
export type DeleteVisitorInput = TypeOf<typeof deleteVisitorSchema>;
