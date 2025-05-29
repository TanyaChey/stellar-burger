import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import {
    INGREDIENT_ADD,
    INGREDIENT_REMOVE,
    INGREDIENTS_RESET,
    INGREDIENT_MOVE,
} from "./actions";
import { TIngredient, TIngredientsList } from "../../utils/types";
// import { IngredientModel } from "../../utils/types";

export const initialState = {
    bun: null as unknown as TIngredient,
    ingr: [] as TIngredientsList,
};

export const burgerConstructorReducer = createReducer(
    initialState,
    (builder) => {
        builder
            .addCase(INGREDIENTS_RESET, () => initialState)
            .addCase(
                INGREDIENT_MOVE,
                (
                    state,
                    action: PayloadAction<{
                        fromIndex: number;
                        toIndex: number;
                    }>
                ) => {
                    state.ingr.splice(
                        action.payload.toIndex,
                        0,
                        state.ingr.splice(action.payload.fromIndex, 1)[0]
                    );
                }
            )
            .addMatcher(
                (action: PayloadAction<TIngredient>) =>
                    action.type === INGREDIENT_ADD.type &&
                    action.payload.type === "bun",
                (state, action) => ({ ...state, bun: action.payload })
            )
            .addMatcher(
                (action: PayloadAction<TIngredient>) =>
                    action.type === INGREDIENT_ADD.type &&
                    action.payload.type !== "bun",
                (state, action: PayloadAction<TIngredient>) => ({
                    ...state,
                    ingr: [...state.ingr, action.payload],
                })
            )
            .addMatcher(
                (action: PayloadAction<TIngredient>) =>
                    action.type === INGREDIENT_REMOVE.type &&
                    action.payload.type === "bun",
                (state) => state
            )
            .addMatcher(
                (action: PayloadAction<TIngredient>) =>
                    action.type === INGREDIENT_REMOVE.type &&
                    action.payload.type !== "bun",
                (state, action: PayloadAction<TIngredient>) => ({
                    ...state,
                    ingr: state.ingr.filter(
                        (el) => el.uuid !== action.payload.uuid
                    ),
                })
            )
            .addDefaultCase((state) => state);
    }
);
