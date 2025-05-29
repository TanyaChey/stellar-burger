import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/hooks";
import { TFeedOrder } from "../../utils/types";

// статус соединения
const profileOrdersSocketStatus = (store: RootState): string =>
    store.profileOrders.status;

export const getProfileOrdersSocketStatus = createSelector(
    profileOrdersSocketStatus,
    (data): string => data
);

// сообщение ошибки
const profileOrdersSocketError = (store: RootState): string =>
    store.profileOrders.error;

export const getProfileOrdersSocketError = createSelector(
    profileOrdersSocketError,
    (data): string => data
);

// список всех заказов
const profileOrdersList = (store: RootState): TFeedOrder[] =>
    store.profileOrders.orders;

export const getProfileOrdersList = createSelector(
    profileOrdersList,
    (data): TFeedOrder[] => data
);

// получаем заказ из общего списка по номеру
export const getProfileOrderById = (number: number) =>
    createSelector(profileOrdersList, (data): TFeedOrder | undefined =>
        data.find((el: TFeedOrder): boolean => el.number === number)
    );
