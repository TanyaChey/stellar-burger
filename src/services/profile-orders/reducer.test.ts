import { WebSocketStatus } from "../../utils/types";
import * as actions from "./actions";
import { initialState, profileOrdersReducer } from "./reducer";

describe("Reducer PROFILE-ORDERS", () => {
    // ========================================================
    it("InitialState", () => {
        expect(profileOrdersReducer(undefined, { type: "" })).toEqual(
            initialState
        );
    });

    // ========================================================
    it("PROFILE_WS_CONNECTING", () => {
        const result = profileOrdersReducer(
            initialState,
            actions.PROFILE_WS_CONNECTING
        );

        expect(result).toEqual({
            ...initialState,
            status: WebSocketStatus.CONNECTING,
            error: "",
        });
    });

    // ========================================================
    it("PROFILE_WS_OPEN", () => {
        const result = profileOrdersReducer(
            initialState,
            actions.PROFILE_WS_OPEN
        );

        expect(result).toEqual({
            ...initialState,
            status: WebSocketStatus.ONLINE,
            error: "",
        });
    });

    // ========================================================
    it("PROFILE_WS_CLOSE", () => {
        const result = profileOrdersReducer(
            initialState,
            actions.PROFILE_WS_CLOSE
        );

        expect(result).toEqual({
            ...initialState,
            status: WebSocketStatus.OFFLINE,
        });
    });

    // ========================================================
    it("PROFILE_WS_ERROR", () => {
        const errorMock = "error";
        const result = profileOrdersReducer(
            initialState,
            actions.PROFILE_WS_ERROR(errorMock)
        );

        expect(result).toEqual({
            ...initialState,
            error: errorMock,
        });
    });

    // ========================================================
    it("PROFILE_WS_MESSAGE", () => {
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
        const result = profileOrdersReducer(
            initialState,
            actions.PROFILE_WS_MESSAGE(messageMock)
        );

        expect(result).toEqual({
            ...initialState,
            orders: messageMock.orders,
            total: messageMock.total,
            totalToday: messageMock.totalToday,
        });
    });
});
