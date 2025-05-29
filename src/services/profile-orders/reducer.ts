import { createReducer } from "@reduxjs/toolkit";
import { TFeedOrder, WebSocketStatus } from "../../utils/types";
import {
    PROFILE_WS_CLOSE,
    PROFILE_WS_CONNECTING,
    PROFILE_WS_ERROR,
    PROFILE_WS_MESSAGE,
    PROFILE_WS_OPEN,
} from "./actions";

export const initialState = {
    status: WebSocketStatus.OFFLINE,
    error: "",
    orders: [] as TFeedOrder[],
    total: 0,
    totalToday: 0,
};

export const profileOrdersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(PROFILE_WS_CONNECTING, (state) => {
            state.status = WebSocketStatus.CONNECTING;
            state.error = "";
        })
        .addCase(PROFILE_WS_OPEN, (state) => {
            state.status = WebSocketStatus.ONLINE;
            state.error = "";
        })
        .addCase(PROFILE_WS_CLOSE, (state) => {
            state.status = WebSocketStatus.OFFLINE;
        })
        .addCase(PROFILE_WS_ERROR, (state, action) => {
            state.error = action.payload;
        })
        .addCase(PROFILE_WS_MESSAGE, (state, action) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        })
        .addDefaultCase((state) => state);
});
