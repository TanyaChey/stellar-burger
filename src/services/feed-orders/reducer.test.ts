import { WebSocketStatus } from "../../utils/types";
import * as actions from "./actions";
import { initialState, feedOrdersReducer } from "./reducer";

describe("Reducer FEED-ORDERS", () => {
    // ========================================================
    it("InitialState", () => {
        expect(feedOrdersReducer(undefined, { type: "" })).toEqual(
            initialState
        );
    });

    // ========================================================
    it("FEED_WS_CONNECTING", () => {
        const result = feedOrdersReducer(
            initialState,
            actions.FEED_WS_CONNECTING
        );

        expect(result).toEqual({
            ...initialState,
            status: WebSocketStatus.CONNECTING,
            error: "",
        });
    });

    // ========================================================
    it("FEED_WS_OPEN", () => {
        const result = feedOrdersReducer(initialState, actions.FEED_WS_OPEN);

        expect(result).toEqual({
            ...initialState,
            status: WebSocketStatus.ONLINE,
            error: "",
        });
    });

    // ========================================================
    it("FEED_WS_CLOSE", () => {
        const result = feedOrdersReducer(initialState, actions.FEED_WS_CLOSE);

        expect(result).toEqual({
            ...initialState,
            status: WebSocketStatus.OFFLINE,
        });
    });

    // ========================================================
    it("FEED_WS_ERROR", () => {
        const errorMock = "error";
        const result = feedOrdersReducer(
            initialState,
            actions.FEED_WS_ERROR(errorMock)
        );

        expect(result).toEqual({
            ...initialState,
            error: errorMock,
        });
    });

    // ========================================================
    it("FEED_WS_MESSAGE", () => {
        const messageMock = {
            success: true,
            orders: [
                {
                    ingredients: ["test", "test"],
                    _id: "test",
                    status: "test",
                    name: "test",
                    number: 0,
                    createdAt: "test",
                    updatedAt: "test",
                },
            ],
            total: 1,
            totalToday: 1,
        };
        const result = feedOrdersReducer(
            initialState,
            actions.FEED_WS_MESSAGE(messageMock)
        );

        expect(result).toEqual({
            ...initialState,
            orders: messageMock.orders,
            total: messageMock.total,
            totalToday: messageMock.totalToday,
        });
    });
});
