import { createAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { TIngredient } from "../../utils/types";

export const REDUCER_NAME = "burgerConstructor";

export type TPayloadIngredient = {
    payload: TIngredient;
};

export type TPayloadSorting = {
    payload: { fromIndex: number; toIndex: number };
};

export const INGREDIENT_ADD = createAction(
    `${REDUCER_NAME}/add`,
    function prepare(item: TIngredient): TPayloadIngredient {
        return {
            payload: {
                ...item,
                uuid: uuid(),
            },
        };
    }
);

export const INGREDIENT_REMOVE = createAction(
    `${REDUCER_NAME}/remove`,
    function prepare(item: TIngredient): TPayloadIngredient {
        return {
            payload: {
                ...item,
            },
        };
    }
);

export const INGREDIENTS_RESET = createAction(`${REDUCER_NAME}/reset`);

export const INGREDIENT_MOVE = createAction(
    `${REDUCER_NAME}/move`,
    function prepare(fromIndex: number, toIndex: number): TPayloadSorting {
        return {
            payload: {
                fromIndex,
                toIndex,
            },
        };
    }
);
