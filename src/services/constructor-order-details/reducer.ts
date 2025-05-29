import { createReducer } from "@reduxjs/toolkit";
import {
    CONSTRUCTOR_ORDER_DETAILS_REQUEST,
    CONSTRUCTOR_ORDER_DETAILS_RESET,
} from "./actions";

export const initialState = {
    item: {
        status: "",
        name: "",
        order: {
            number: 0,
        },
    },
    status: {
        loading: false,
        error: false,
        success: false,
    },
};

export const constructorOrderDetailsReducer = createReducer(
    initialState,
    (builder) => {
        builder
            // Вызывается прямо перед выполнением запроса
            .addCase(CONSTRUCTOR_ORDER_DETAILS_REQUEST.pending, (state) => ({
                ...state,
                status: {
                    loading: true,
                    error: false,
                    success: false,
                },
            }))

            // Вызывается в том случае если запрос успешно выполнился
            .addCase(
                CONSTRUCTOR_ORDER_DETAILS_REQUEST.fulfilled,
                (_, action) => {
                    return {
                        // Добавляем пользователя
                        item: action.payload,
                        status: {
                            loading: false,
                            error: false,
                            success: true,
                        },
                    };
                }
            )
            // Вызывается в случае ошибки
            .addCase(CONSTRUCTOR_ORDER_DETAILS_REQUEST.rejected, (state) => ({
                // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
                ...state,
                status: {
                    loading: false,
                    error: true,
                    success: false,
                },
            }))
            .addCase(CONSTRUCTOR_ORDER_DETAILS_RESET, () => initialState)
            .addDefaultCase((state) => state);
    }
);
