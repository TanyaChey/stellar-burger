import { createAction } from "@reduxjs/toolkit";
import { TIngredient, TIngredientsList } from "../../utils/types";
import * as actions from "./actions";
import { initialState, burgerConstructorReducer } from "./reducer";

describe("Reducer BURGER-CONSTRUCTOR", () => {
    // ========================================================
    it("InitialState", () => {
        expect(burgerConstructorReducer(undefined, { type: "" })).toEqual(
            initialState
        );
    });

    // ========================================================
    it("INGREDIENTS_RESET", () => {
        const result = burgerConstructorReducer(
            initialState,
            actions.INGREDIENTS_RESET
        );

        expect(result).toEqual(initialState);
    });

    // ========================================================
    it("INGREDIENT_MOVE", () => {
        const stateMock = {
            ...initialState,
            ingr: [
                {
                    _id: "test1",
                },
                {
                    _id: "test2",
                },
            ] as TIngredientsList,
        };
        const moveMock = { fromIndex: 1, toIndex: 0 };

        const result = burgerConstructorReducer(
            stateMock,
            actions.INGREDIENT_MOVE(moveMock.fromIndex, moveMock.toIndex)
        );

        expect(result).toEqual({
            ...initialState,
            ingr: [
                {
                    _id: "test2",
                },
                {
                    _id: "test1",
                },
            ],
        });
    });

    // ========================================================
    it("INGREDIENT_ADD.bun", () => {
        const addMock = {
            _id: "test",
            type: "bun",
        } as TIngredient;

        const INGREDIENT_ADD = createAction(
            `${actions.REDUCER_NAME}/add`,
            function prepare(item: TIngredient): actions.TPayloadIngredient {
                return {
                    payload: {
                        ...item,
                    },
                };
            }
        );

        const result = burgerConstructorReducer(
            initialState,
            INGREDIENT_ADD(addMock)
        );

        expect(result).toEqual({
            ...initialState,
            bun: addMock,
        });
    });

    // ========================================================
    it("INGREDIENT_ADD.ingr", () => {
        const addMock = {
            _id: "test",
            type: "inrg",
        } as TIngredient;

        const INGREDIENT_ADD = createAction(
            `${actions.REDUCER_NAME}/add`,
            function prepare(item: TIngredient): actions.TPayloadIngredient {
                return {
                    payload: {
                        ...item,
                    },
                };
            }
        );

        const result = burgerConstructorReducer(
            initialState,
            INGREDIENT_ADD(addMock)
        );

        expect(result).toEqual({
            ...initialState,
            ingr: [addMock],
        });
    });

    // ========================================================
    it("INGREDIENT_REMOVE.bun", () => {
        const removeMock = {
            _id: "test1",
            type: "bun",
            uuid: "test1",
        } as TIngredient;

        const stateMock = {
            bun: {
                _id: "test1",
                type: "bun",
                uuid: "test1",
            } as TIngredient,
            ingr: [
                {
                    _id: "test2",
                    type: "ingr",
                    uuid: "test2",
                },
                {
                    _id: "test3",
                    type: "ingr",
                    uuid: "test3",
                },
            ] as TIngredientsList,
        };

        const result = burgerConstructorReducer(
            stateMock,
            actions.INGREDIENT_REMOVE(removeMock)
        );

        expect(result).toEqual(stateMock);
    });

    // ========================================================
    it("INGREDIENT_REMOVE.ingr", () => {
        const removeMock = {
            _id: "test2",
            type: "inrg",
            uuid: "test2",
        } as TIngredient;

        const stateMock = {
            bun: {
                _id: "test1",
                type: "bun",
                uuid: "test1",
            } as TIngredient,
            ingr: [
                {
                    _id: "test2",
                    type: "ingr",
                    uuid: "test2",
                },
                {
                    _id: "test3",
                    type: "ingr",
                    uuid: "test3",
                },
            ] as TIngredientsList,
        };

        const result = burgerConstructorReducer(
            stateMock,
            actions.INGREDIENT_REMOVE(removeMock)
        );

        expect(result).toEqual({
            ...stateMock,
            ingr: [
                {
                    _id: "test3",
                    type: "ingr",
                    uuid: "test3",
                },
            ],
        });
    });
});
