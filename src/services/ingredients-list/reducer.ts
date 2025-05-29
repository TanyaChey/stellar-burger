import { createReducer } from "@reduxjs/toolkit";
import { INGREDIENTS_REQEST } from "./actions";
import { TIngredientsList } from "../../utils/types";

export const initialState = {
    items: [] as TIngredientsList,
    status: {
        loading: false,
        error: false,
        success: false,
    },
};

export const ingredientsListReducer = createReducer(initialState, (builder) => {
    builder
        // Вызывается прямо перед выполнением запроса
        .addCase(INGREDIENTS_REQEST.pending, (state) => ({
            ...state,
            status: {
                loading: true,
                error: false,
                success: false,
            },
        }))
        // Вызывается в том случае если запрос успешно выполнился
        .addCase(INGREDIENTS_REQEST.fulfilled, (_, action) => ({
            // Добавляем пользователя
            items: action.payload,
            status: {
                loading: false,
                error: false,
                success: true,
            },
        }))
        // Вызывается в случае ошибки
        .addCase(INGREDIENTS_REQEST.rejected, (state) => ({
            // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
            ...state,
            status: {
                loading: false,
                error: true,
                success: false,
            },
        }))
        .addDefaultCase((state) => state);
});
