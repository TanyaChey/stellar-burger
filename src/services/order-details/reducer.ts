import { createReducer } from "@reduxjs/toolkit";
import { ORDER_REQEST, ORDER_RESET } from "./actions";
import { TFeedOrder } from "../../utils/types";

export const initialState = {
    order: null as unknown as TFeedOrder,
    status: {
        loading: false,
        error: false,
        success: false,
    },
};

export const orderDetailsReducer = createReducer(initialState, (builder) => {
    builder
        // Вызывается прямо перед выполнением запроса
        .addCase(ORDER_REQEST.pending, (state) => ({
            ...state,
            status: {
                loading: true,
                error: false,
                success: false,
            },
        }))
        // Вызывается в том случае если запрос успешно выполнился
        .addCase(ORDER_REQEST.fulfilled, (_, action) => ({
            // Записываем детали заказа
            order: action.payload,
            status: {
                loading: false,
                error: false,
                success: true,
            },
        }))
        // Вызывается в случае ошибки
        .addCase(ORDER_REQEST.rejected, (state) => ({
            // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
            ...state,
            status: {
                loading: false,
                error: true,
                success: false,
            },
        }))
        .addCase(ORDER_RESET, () => initialState)
        .addDefaultCase((state) => state);
});
