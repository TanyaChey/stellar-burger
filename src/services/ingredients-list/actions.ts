import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestApi } from "../../utils/request-api";
import { INGREDIENTS } from "../../utils/vars";

const REDUCER_NAME = "ingredientsList";

export const INGREDIENTS_REQEST = createAsyncThunk(
    `${REDUCER_NAME}/request`,
    async () => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(INGREDIENTS, { method: "GET" });
        return response.data;
    }
);
