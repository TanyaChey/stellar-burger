import {
    ActionCreatorWithPayload,
    ActionCreatorWithoutPayload,
    Middleware,
} from "@reduxjs/toolkit";
import { RootState } from "../store/hooks";
import { TFeedOrdersAll } from "../../utils/types";
import { TOKEN_DEAD } from "../../utils/vars";
import { USER_GET_INFO } from "../auth/actions";

export type TWsActionTypes = {
    WS_CONNECT: ActionCreatorWithPayload<string>;
    WS_DISCONNECT: ActionCreatorWithoutPayload;
    WS_SEND_MESSAGE?: ActionCreatorWithPayload<any>;
    WS_CONNECTING: ActionCreatorWithoutPayload;
    WS_OPEN: ActionCreatorWithoutPayload;
    WS_CLOSE: ActionCreatorWithoutPayload;
    WS_MESSAGE: ActionCreatorWithPayload<TFeedOrdersAll>;
    WS_ERROR: ActionCreatorWithPayload<string>;
};

export const socketMiddleware = (
    wsActions: TWsActionTypes
): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            let manualClose = false;
            const { dispatch } = store;
            // const dispatch = useAppDispatch();

            const {
                WS_CONNECT,
                WS_DISCONNECT,
                WS_SEND_MESSAGE,
                WS_CONNECTING,
                WS_OPEN,
                WS_CLOSE,
                WS_MESSAGE,
                WS_ERROR,
            } = wsActions;

            if (WS_CONNECT.match(action)) {
                socket = new WebSocket(action.payload);
                manualClose = false;
                dispatch(WS_CONNECTING());
            }

            if (socket) {
                socket.onopen = (event) => {
                    dispatch(WS_OPEN());
                };

                socket.onerror = (event) => {
                    dispatch(WS_ERROR("ERROR"));
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (parsedData.success === true) {
                        dispatch(WS_MESSAGE(parsedData));
                    } else if (parsedData.message === TOKEN_DEAD) {
                        dispatch(USER_GET_INFO()).then(() => {
                            dispatch(WS_CONNECT(action.payload));
                        });
                    } else {
                        dispatch(WS_ERROR(parsedData.message));
                    }
                };

                socket.onclose = (event) => {
                    manualClose
                        ? dispatch(WS_CLOSE())
                        : dispatch(WS_CONNECTING());
                };

                if (WS_SEND_MESSAGE?.match(action)) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (WS_DISCONNECT.match(action)) {
                    manualClose = true;
                    socket.close();
                    socket = null;
                }
            }
            next(action);
        };
    };
};
