import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/hooks";

type TConstroctorOrderItem = {
    status: string;
    name: string;
    order: {
        number: number;
    };
};

// детали заказа
const storeOrderDetails = (store: RootState): TConstroctorOrderItem =>
    store.constructorOrderDetails.item;

export const getConstructorOrderDetails = createSelector(
    storeOrderDetails,
    (data): TConstroctorOrderItem => data
);
export const getConstructorOrderNumber = createSelector(
    storeOrderDetails,
    (data): number => data.order.number
);

export const getConstructorOrderDetailsIsLoading = createSelector(
    (store: RootState): boolean => store.constructorOrderDetails.status.loading,
    (data): boolean => data
);

export const getConstructorOrderDetailsHasError = createSelector(
    (store: RootState): boolean => store.constructorOrderDetails.status.error,
    (data): boolean => data
);

export const getConstructorOrderDetailsRequestSuccess = createSelector(
    (store: RootState): boolean => store.constructorOrderDetails.status.success,
    (data): boolean => data
);
