import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { requestApi } from "../../utils/request-api";
import { ACCESS_TOKEN, CONTENT_TYPE_DATA, ORDERS } from "../../utils/vars";
import { INGREDIENTS_RESET } from "../burger-constructor/actions";

const REDUCER_NAME = "constructorOrderDetails";

export const CONSTRUCTOR_ORDER_DETAILS_REQUEST = createAsyncThunk(
    `${REDUCER_NAME}/request`,
    async (data: { ingredients: string[] }, { dispatch }) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(ORDERS, {
            method: "POST",
            headers: {
                "Content-Type": CONTENT_TYPE_DATA,
                authorization: localStorage.getItem(ACCESS_TOKEN) as string,
            },
            body: JSON.stringify(data),
        });
        if (response) dispatch(INGREDIENTS_RESET());
        return response;
    }
);

export const CONSTRUCTOR_ORDER_DETAILS_RESET = createAction(
    `${REDUCER_NAME}/reset`
);
