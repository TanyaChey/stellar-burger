import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/hooks";
import { TFeedOrder } from "../../utils/types";

// статус соединения
const feedOrdersSocketStatus = (store: RootState): string =>
    store.feedOrders.status;

export const getFeedOrdersSocketStatus = createSelector(
    feedOrdersSocketStatus,
    (data): string => data
);

// сообщение ошибки
const feedOrdersSocketError = (store: RootState): string =>
    store.feedOrders.error;

export const getFeedOrdersSocketError = createSelector(
    feedOrdersSocketError,
    (data): string => data
);

// список всех заказов
const feedOrdersList = (store: RootState): TFeedOrder[] =>
    store.feedOrders.orders;

export const getFeedOrdersList = createSelector(
    feedOrdersList,
    (data): TFeedOrder[] => data
);

// получаем заказ из общего списка по номеру
export const getFeedOrderById = (number: number) =>
    createSelector(feedOrdersList, (data): TFeedOrder | undefined =>
        data.find((el: TFeedOrder): boolean => el.number === number)
    );

// кол-во заказов
const feedOrdersTotal = (store: RootState): number => store.feedOrders.total;

export const getFeedOrdersTotal = createSelector(
    feedOrdersTotal,
    (data): number => data
);

const feedOrdersTotalToday = (store: RootState): number =>
    store.feedOrders.totalToday;

export const getFeedOrdersTotalToday = createSelector(
    feedOrdersTotalToday,
    (data): number => data
);
