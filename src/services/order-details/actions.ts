import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { requestApi } from "../../utils/request-api";
import { ORDERS } from "../../utils/vars";

const REDUCER_NAME = "orderDetails";

export const ORDER_REQEST = createAsyncThunk(
    `${REDUCER_NAME}/request`,
    async (id: number) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(ORDERS + "/" + id, {
            method: "GET",
        });
        return response.orders[0];
    }
);

export const ORDER_RESET = createAction(`${REDUCER_NAME}/reset`);
