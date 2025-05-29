import {
    AnyAction,
    Dispatch,
    createAction,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { fetchWithRefresh, requestApi } from "../../utils/request-api";
import {
    ACCESS_TOKEN,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_RESET,
    AUTH_RESET_CONFIRM,
    AUTH_USER,
    CONTENT_TYPE_DATA,
} from "../../utils/vars";
import {
    TApiGetUser,
    TApiAuthUser,
    TApiLogoutUser,
    TApiForgotUser,
    TApiResetUser,
} from "../../utils/types";

export const REDUCER_NAME = "user";

export type TBodySend = {
    email?: string;
    password?: string;
    name?: string;
    token?: string;
};

// ================================
// ===== чекаем пользователя ======
// ================================
export const USER_CHECK_AUTH = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        localStorage.getItem(ACCESS_TOKEN) &&
        localStorage.getItem(ACCESS_TOKEN) !== undefined &&
        localStorage.getItem(ACCESS_TOKEN) !== "undefined"
            ? dispatch(USER_GET_INFO())
            : dispatch(USER_CHECKED());
    };
};

// =========================================
// ===== маркер проверки пользователя ======
// =========================================
export const USER_CHECKED = createAction(`${REDUCER_NAME}/user_checked`);

// =========================================
// ===== получаем данные пользователя ======
// =========================================
export const USER_GET_INFO = createAsyncThunk<TApiGetUser>(
    `${REDUCER_NAME}/get_info`,
    async () => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await fetchWithRefresh(AUTH_USER, {
            method: "GET",
            headers: {
                "Content-Type": CONTENT_TYPE_DATA,
                authorization: localStorage.getItem(ACCESS_TOKEN) as string,
            },
        });
        return response;
    }
);

// ======================================
// ===== регистрируем пользователя ======
// ======================================

export const USER_REGISTER = createAsyncThunk<TApiAuthUser, TBodySend>(
    `${REDUCER_NAME}/register`,
    async (bodySend: TBodySend) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(AUTH_REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": CONTENT_TYPE_DATA,
            },
            body: JSON.stringify(bodySend),
        });
        return response as TApiAuthUser;
    }
);

// ====================================
// ===== авторизация пользователя =====
// ====================================
export const USER_LOGIN = createAsyncThunk<TApiAuthUser, TBodySend>(
    `${REDUCER_NAME}/login`,
    async (bodySend: TBodySend) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(AUTH_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": CONTENT_TYPE_DATA,
            },
            body: JSON.stringify(bodySend),
        });

        return response;
    }
);

// ==================================================================================
// ====== ресет пароля - запрашиваем совпадение на сервере, пишем ответ в стор ======
// ==================================================================================
export const USER_RESET = createAsyncThunk<TApiForgotUser, TBodySend>(
    `${REDUCER_NAME}/reset`,
    async (bodySend: TBodySend) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(AUTH_RESET, {
            method: "POST",
            headers: {
                "Content-Type": CONTENT_TYPE_DATA,
            },
            body: JSON.stringify(bodySend),
        });
        return response;
    }
);

// ========================================================================
// ===== ресет пароля - отправка нового пароля пользователя на сервер =====
// ========================================================================
export const USER_RESET_CONFIRM = createAsyncThunk<TApiResetUser, TBodySend>(
    `${REDUCER_NAME}/reset_confirm`,
    async (bodySend: TBodySend) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(AUTH_RESET_CONFIRM, {
            method: "POST",
            headers: {
                "Content-Type": CONTENT_TYPE_DATA,
            },
            body: JSON.stringify(bodySend),
        });
        return response;
    }
);

// ===============================
// ===== логаут пользователя =====
// ===============================
export const USER_LOGOUT = createAsyncThunk<TApiLogoutUser>(
    `${REDUCER_NAME}/logout`,
    async () => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(AUTH_LOGOUT, {
            method: "POST",
            headers: {
                "Content-Type": CONTENT_TYPE_DATA,
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        });
        return response;
    }
);

// ======================================================================
// ====== отправка отредактированных данных пользователя на сервер ======
// ======================================================================
export const USER_UPDATE = createAsyncThunk<TApiGetUser, TBodySend>(
    `${REDUCER_NAME}/update`,
    async (bodySend: TBodySend) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await fetchWithRefresh(AUTH_USER, {
            method: "PATCH",
            headers: {
                "Content-Type": CONTENT_TYPE_DATA,
                authorization: localStorage.getItem(ACCESS_TOKEN) as string,
            },
            body: JSON.stringify(bodySend),
        });
        return response;
    }
);
