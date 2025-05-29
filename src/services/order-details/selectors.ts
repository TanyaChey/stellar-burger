import { createSelector } from "@reduxjs/toolkit";
import { TFeedOrder } from "../../utils/types";
import { RootState } from "../store/hooks";

// список всех игредиентов
const storeOrderDetails = (store: RootState): TFeedOrder =>
    store.orderDetails.order;

export const getOrderDetails = createSelector(
    storeOrderDetails,
    (data): TFeedOrder => data
);

export const getOrderDetailsIsLoading = createSelector(
    (store: RootState): boolean => store.orderDetails.status.loading,
    (data): boolean => data
);

export const getOrderDetailsHasError = createSelector(
    (store: RootState): boolean => store.orderDetails.status.error,
    (data): boolean => data
);

export const getOrderDetailsRequestSuccess = createSelector(
    (store: RootState): boolean => store.orderDetails.status.success,
    (data): boolean => data
);
