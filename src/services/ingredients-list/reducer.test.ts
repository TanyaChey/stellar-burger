import { TIngredientsList } from "../../utils/types";
import * as actions from "./actions";
import { initialState, ingredientsListReducer } from "./reducer";

describe("Reducer INGREDIENTS-LIST", () => {
    // ========================================================
    it("InitialState", () => {
        expect(ingredientsListReducer(undefined, { type: "" })).toEqual(
            initialState
        );
    });

    // ========================================================
    it("INGREDIENTS_REQEST.pending", () => {
        const result = ingredientsListReducer(
            initialState,
            actions.INGREDIENTS_REQEST.pending
        );

        expect(result).toEqual({
            ...initialState,
            status: {
                loading: true,
                error: false,
                success: false,
            },
        });
    });

    // ========================================================
    it("INGREDIENTS_REQEST.fulfilled", () => {
        const ingredientsMock = [
            {
                _id: "test1",
                name: "test",
            },
            {
                _id: "test2",
                name: "test",
            },
        ] as TIngredientsList;

        const result = ingredientsListReducer(
            initialState,
            actions.INGREDIENTS_REQEST.fulfilled(
                ingredientsMock,
                "test",
                undefined
            )
        );

        expect(result).toEqual({
            items: ingredientsMock,
            status: {
                loading: false,
                error: false,
                success: true,
            },
        });
    });

    // ========================================================
    it("INGREDIENTS_REQEST.rejected", () => {
        const result = ingredientsListReducer(
            initialState,
            actions.INGREDIENTS_REQEST.rejected
        );

        expect(result).toEqual({
            ...initialState,
            status: {
                loading: false,
                error: true,
                success: false,
            },
        });
    });
});
