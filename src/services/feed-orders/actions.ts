// wsActionTypes.ts

import { createAction } from "@reduxjs/toolkit";
import { TFeedOrdersAll } from "../../utils/types";

const REDUCER_NAME = "feedOrders";

export const FEED_WS_CONNECT = createAction<string>(
    `${REDUCER_NAME}/ws_connect`
);
export const FEED_WS_DISCONNECT = createAction(`${REDUCER_NAME}/ws_disconnect`);
export const FEED_WS_SEND_MESSAGE = createAction<any>(
    `${REDUCER_NAME}/ws_send_message`
);
export const FEED_WS_CONNECTING = createAction(`${REDUCER_NAME}/ws_connecting`);
export const FEED_WS_OPEN = createAction(`${REDUCER_NAME}/ws_open`);
export const FEED_WS_CLOSE = createAction(`${REDUCER_NAME}/ws_close`);
export const FEED_WS_MESSAGE = createAction<TFeedOrdersAll>(
    `${REDUCER_NAME}/ws_message`
);
export const FEED_WS_ERROR = createAction<string>(`${REDUCER_NAME}/ws_error`);

export type TFeedOrdesActions =
    | ReturnType<typeof FEED_WS_CONNECT>
    | ReturnType<typeof FEED_WS_DISCONNECT>
    | ReturnType<typeof FEED_WS_SEND_MESSAGE>
    | ReturnType<typeof FEED_WS_CONNECTING>
    | ReturnType<typeof FEED_WS_OPEN>
    | ReturnType<typeof FEED_WS_CLOSE>
    | ReturnType<typeof FEED_WS_MESSAGE>
    | ReturnType<typeof FEED_WS_ERROR>;
