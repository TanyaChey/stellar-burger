import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { userReducer } from "../auth/reducer";
import { burgerConstructorReducer } from "../burger-constructor/reducer";
import { constructorOrderDetailsReducer } from "../constructor-order-details/reducer";
import { ingredientsListReducer } from "../ingredients-list/reducer";
import { mobileReducer } from "../mobile/reducer";
import { feedOrdersReducer } from "../feed-orders/reducer";
import { profileOrdersReducer } from "../profile-orders/reducer";
import { orderDetailsReducer } from "../order-details/reducer";
import { socketMiddleware } from "../middleware/socket-middleware";
import {
    FEED_WS_CONNECT,
    FEED_WS_DISCONNECT,
    FEED_WS_SEND_MESSAGE,
    FEED_WS_CONNECTING,
    FEED_WS_OPEN,
    FEED_WS_CLOSE,
    FEED_WS_MESSAGE,
    FEED_WS_ERROR,
} from "../feed-orders/actions";
import {
    PROFILE_WS_CONNECT,
    PROFILE_WS_DISCONNECT,
    PROFILE_WS_SEND_MESSAGE,
    PROFILE_WS_CONNECTING,
    PROFILE_WS_OPEN,
    PROFILE_WS_CLOSE,
    PROFILE_WS_MESSAGE,
    PROFILE_WS_ERROR,
} from "../profile-orders/actions";

export const rootReducer = combineReducers({
    mobile: mobileReducer,
    ingredientsList: ingredientsListReducer,
    constructorList: burgerConstructorReducer,
    constructorOrderDetails: constructorOrderDetailsReducer,
    user: userReducer,
    feedOrders: feedOrdersReducer,
    profileOrders: profileOrdersReducer,
    orderDetails: orderDetailsReducer,
});

const feedMiddleware = socketMiddleware({
    WS_CONNECT: FEED_WS_CONNECT,
    WS_DISCONNECT: FEED_WS_DISCONNECT,
    WS_SEND_MESSAGE: FEED_WS_SEND_MESSAGE,
    WS_CONNECTING: FEED_WS_CONNECTING,
    WS_OPEN: FEED_WS_OPEN,
    WS_CLOSE: FEED_WS_CLOSE,
    WS_MESSAGE: FEED_WS_MESSAGE,
    WS_ERROR: FEED_WS_ERROR,
});

const profileMiddleware = socketMiddleware({
    WS_CONNECT: PROFILE_WS_CONNECT,
    WS_DISCONNECT: PROFILE_WS_DISCONNECT,
    WS_SEND_MESSAGE: PROFILE_WS_SEND_MESSAGE,
    WS_CONNECTING: PROFILE_WS_CONNECTING,
    WS_OPEN: PROFILE_WS_OPEN,
    WS_CLOSE: PROFILE_WS_CLOSE,
    WS_MESSAGE: PROFILE_WS_MESSAGE,
    WS_ERROR: PROFILE_WS_ERROR,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, feedMiddleware, profileMiddleware],
});
