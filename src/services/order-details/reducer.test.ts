import { TFeedOrder } from "../../utils/types";
import * as actions from "./actions";
import { initialState, orderDetailsReducer } from "./reducer";

describe("Reducer ORDER-DETAILS", () => {
    // ========================================================
    it("InitialState", () => {
        expect(orderDetailsReducer(undefined, { type: "" })).toEqual(
            initialState
        );
    });

    // ========================================================
    it("ORDER_REQEST.pending", () => {
        const result = orderDetailsReducer(
            initialState,
            actions.ORDER_REQEST.pending
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
    it("ORDER_REQEST.fulfilled", () => {
        const dataMock = {
            ingredients: ["test", "test"],
            _id: "test",
        } as TFeedOrder;

        const result = orderDetailsReducer(
            initialState,
            actions.ORDER_REQEST.fulfilled(dataMock, "test", 0)
        );

        expect(result).toEqual({
            order: dataMock,
            status: {
                loading: false,
                error: false,
                success: true,
            },
        });
    });

    // ========================================================
    it("ORDER_REQEST.rejected", () => {
        const result = orderDetailsReducer(
            initialState,
            actions.ORDER_REQEST.rejected
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
