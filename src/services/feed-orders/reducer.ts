import { createReducer } from "@reduxjs/toolkit";
import { TFeedOrder, WebSocketStatus } from "../../utils/types";
import {
    FEED_WS_CLOSE,
    FEED_WS_CONNECTING,
    FEED_WS_ERROR,
    FEED_WS_MESSAGE,
    FEED_WS_OPEN,
} from "./actions";

export const initialState = {
    status: WebSocketStatus.OFFLINE,
    error: "",
    orders: [] as TFeedOrder[],
    total: 0,
    totalToday: 0,
};

export const feedOrdersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(FEED_WS_CONNECTING, (state) => {
            state.status = WebSocketStatus.CONNECTING;
            state.error = "";
        })
        .addCase(FEED_WS_OPEN, (state) => {
            state.status = WebSocketStatus.ONLINE;
            state.error = "";
        })
        .addCase(FEED_WS_CLOSE, (state) => {
            state.status = WebSocketStatus.OFFLINE;
        })
        .addCase(FEED_WS_ERROR, (state, action) => {
            state.error = action.payload;
        })
        .addCase(FEED_WS_MESSAGE, (state, action) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        })
        .addDefaultCase((state) => state);
});
