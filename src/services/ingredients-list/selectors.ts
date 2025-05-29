import { createSelector } from "@reduxjs/toolkit";
import { TIngredient, TIngredientsList } from "../../utils/types";
import { RootState } from "../store/hooks";

// список всех игредиентов
const storeIngredientsList = (store: RootState): TIngredientsList =>
    store.ingredientsList.items;

export const getIngredientsList = createSelector(
    storeIngredientsList,
    (data): TIngredientsList => data
);

// получаем игредиент из общего списка по id
export const getIngredientById = (id: string) =>
    createSelector(storeIngredientsList, (data): TIngredient | undefined =>
        data.find((el: TIngredient): boolean => el._id === id)
    );

// получаем массив картинок игредиенов из общего списка по id
export const getImagesByIngredientIds = (ids: string[]) =>
    createSelector(storeIngredientsList, (data): (string | undefined)[] =>
        ids.map(
            (id: string): string | undefined =>
                data.find((el: TIngredient): boolean => el._id === id)
                    ?.image_mobile
        )
    );

export const getIngredientsIsLoading = createSelector(
    (store: RootState): boolean => store.ingredientsList.status.loading,
    (data): boolean => data
);

export const getIngredientsHasError = createSelector(
    (store: RootState): boolean => store.ingredientsList.status.error,
    (data): boolean => data
);

export const getIngredientsRequestSuccess = createSelector(
    (store: RootState): boolean => store.ingredientsList.status.success,
    (data): boolean => data
);

// прайс заказа для ленты
export const getOrderTotalPrice = (ids: string[]) =>
    createSelector(storeIngredientsList, (data): number =>
        ids.reduce(
            (acc, id): number =>
                acc + data.find((el: TIngredient) => el._id === id)!.price,
            0
        )
    );
