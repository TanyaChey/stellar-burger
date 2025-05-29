// wsActionTypes.ts

import { createAction } from "@reduxjs/toolkit";
import { TFeedOrdersAll } from "../../utils/types";

const REDUCER_NAME = "profileOrders";

export const PROFILE_WS_CONNECT = createAction<string>(
    `${REDUCER_NAME}/ws_connect`
);
export const PROFILE_WS_DISCONNECT = createAction(
    `${REDUCER_NAME}/ws_disconnect`
);
export const PROFILE_WS_SEND_MESSAGE = createAction<any>(
    `${REDUCER_NAME}/ws_send_message`
);
export const PROFILE_WS_CONNECTING = createAction(
    `${REDUCER_NAME}/ws_connecting`
);
export const PROFILE_WS_OPEN = createAction(`${REDUCER_NAME}/ws_open`);
export const PROFILE_WS_CLOSE = createAction(`${REDUCER_NAME}/ws_close`);
export const PROFILE_WS_MESSAGE = createAction<TFeedOrdersAll>(
    `${REDUCER_NAME}/ws_message`
);
export const PROFILE_WS_ERROR = createAction<string>(
    `${REDUCER_NAME}/ws_error`
);

export type TProfileOrdesActions =
    | ReturnType<typeof PROFILE_WS_CONNECT>
    | ReturnType<typeof PROFILE_WS_DISCONNECT>
    | ReturnType<typeof PROFILE_WS_SEND_MESSAGE>
    | ReturnType<typeof PROFILE_WS_CONNECTING>
    | ReturnType<typeof PROFILE_WS_OPEN>
    | ReturnType<typeof PROFILE_WS_CLOSE>
    | ReturnType<typeof PROFILE_WS_MESSAGE>
    | ReturnType<typeof PROFILE_WS_ERROR>;
