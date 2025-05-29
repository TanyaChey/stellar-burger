import * as actions from "./actions";
import { initialState, constructorOrderDetailsReducer } from "./reducer";

describe("Reducer CONSTRUCTOR-ORDER-DETAILS", () => {
    // ========================================================
    it("InitialState", () => {
        expect(constructorOrderDetailsReducer(undefined, { type: "" })).toEqual(
            initialState
        );
    });

    // ========================================================
    it("CONSTRUCTOR_ORDER_DETAILS_REQUEST.pending", () => {
        const result = constructorOrderDetailsReducer(
            initialState,
            actions.CONSTRUCTOR_ORDER_DETAILS_REQUEST.pending
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
    it("CONSTRUCTOR_ORDER_DETAILS_REQUEST.fulfilled", () => {
        const dataMock = {
            ingredients: ["test", "test"],
        };

        const result = constructorOrderDetailsReducer(
            initialState,
            actions.CONSTRUCTOR_ORDER_DETAILS_REQUEST.fulfilled(
                dataMock,
                "test",
                dataMock
            )
        );

        expect(result).toEqual({
            item: dataMock,
            status: {
                loading: false,
                error: false,
                success: true,
            },
        });
    });

    // ========================================================
    it("CONSTRUCTOR_ORDER_DETAILS_REQUEST.rejected", () => {
        const result = constructorOrderDetailsReducer(
            initialState,
            actions.CONSTRUCTOR_ORDER_DETAILS_REQUEST.rejected
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

    // ========================================================
    it("CONSTRUCTOR_ORDER_DETAILS_RESET", () => {
        const result = constructorOrderDetailsReducer(
            initialState,
            actions.CONSTRUCTOR_ORDER_DETAILS_RESET
        );

        expect(result).toEqual(initialState);
    });
});
