import { createReducer } from "@reduxjs/toolkit";
import {
    USER_CHECKED,
    USER_GET_INFO,
    USER_REGISTER,
    USER_LOGIN,
    USER_RESET,
    USER_RESET_CONFIRM,
    USER_LOGOUT,
    USER_UPDATE,
} from "./actions";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/vars";

export type TUser = {
    name: string;
    email: string;
};

export const initialState = {
    user: null as unknown as TUser,
    isAuthChecked: false,
    status: {
        get_info: {
            loading: false,
            error: false,
            success: false,
        },
        register: {
            loading: false,
            error: false,
            success: false,
        },
        login: {
            loading: false,
            error: false,
            success: false,
        },
        reset: {
            loading: false,
            error: false,
            success: false,
        },
        reset_confirm: {
            loading: false,
            error: false,
            success: false,
        },
        logout: {
            loading: false,
            error: false,
            success: false,
        },
        update: {
            loading: false,
            error: false,
            success: false,
        },
    },
};

export const userReducer = createReducer(initialState, (builder) => {
    builder

        // =========================================
        // ===== маркер проверки пользователя ======
        // =========================================

        .addCase(USER_CHECKED, (state) => ({
            ...state,
            isAuthChecked: true,
        }))

        // ===================================
        // ===== проверяем пользователя ======
        // ===================================

        // Вызывается прямо перед выполнением запроса
        .addCase(USER_GET_INFO.pending, (state) => ({
            ...state,
            status: {
                ...state.status,
                get_info: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        }))
        // Вызывается в том случае если запрос успешно выполнился
        .addCase(USER_GET_INFO.fulfilled, (state, action) => ({
            // Добавляем пользователя
            user: action.payload.user,
            isAuthChecked: true,
            status: {
                ...state.status,
                get_info: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        }))
        // Вызывается в случае ошибки
        .addCase(USER_GET_INFO.rejected, (state) => {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            return {
                ...state,
                user: initialState.user,
                status: {
                    ...state.status,
                    get_info: {
                        loading: false,
                        error: true,
                        success: false,
                    },
                },
            };
        })

        // ====================================
        // ===== авторизация пользователя =====
        // ====================================

        // Вызывается прямо перед выполнением запроса
        .addCase(USER_LOGIN.pending, (state) => ({
            ...state,
            status: {
                ...state.status,
                login: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        }))
        // Вызывается в том случае если запрос успешно выполнился
        .addCase(USER_LOGIN.fulfilled, (state, action) => {
            // пишем токены в localStorage
            localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
            localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
            return {
                // Добавляем пользователя
                user: action.payload.user,
                isAuthChecked: true,
                status: {
                    ...state.status,
                    login: {
                        loading: false,
                        error: false,
                        success: true,
                    },
                },
            };
        })
        // Вызывается в случае ошибки
        .addCase(USER_LOGIN.rejected, (state) => ({
            ...state,
            status: {
                ...state.status,
                login: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        }))

        // ======================================
        // ===== регистрируем пользователя ======
        // ======================================

        // Вызывается прямо перед выполнением запроса
        .addCase(USER_REGISTER.pending, (state) => ({
            ...state,
            status: {
                ...state.status,
                register: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        }))
        // Вызывается в том случае если запрос успешно выполнился
        .addCase(USER_REGISTER.fulfilled, (state, action) => {
            // пишем токены в localStorage
            localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
            localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
            return {
                // Добавляем пользователя
                user: action.payload.user,
                isAuthChecked: true,
                status: {
                    ...state.status,
                    register: {
                        loading: false,
                        error: false,
                        success: true,
                    },
                },
            };
        })
        // Вызывается в случае ошибки
        .addCase(USER_REGISTER.rejected, (state) => ({
            ...state,
            status: {
                ...state.status,
                register: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        }))

        // ==================================================================================
        // ====== ресет пароля - запрашиваем совпадение на сервере, пишем ответ в стор ======
        // ==================================================================================

        // Вызывается прямо перед выполнением запроса
        .addCase(USER_RESET.pending, (state) => ({
            ...state,
            status: {
                ...state.status,
                reset: {
                    loading: true,
                    error: false,
                    success: false,
                },
                reset_confirm: {
                    loading: false,
                    error: false,
                    success: false,
                },
            },
        }))
        // Вызывается в том случае если запрос успешно выполнился
        .addCase(USER_RESET.fulfilled, (state, action) => ({
            ...state,
            status: {
                ...state.status,
                reset: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        }))
        // Вызывается в случае ошибки
        .addCase(USER_RESET.rejected, (state) => ({
            ...state,
            status: {
                ...state.status,
                reset: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        }))

        // ========================================================================
        // ===== ресет пароля - отправка нового пароля пользователя на сервер =====
        // ========================================================================

        // Вызывается прямо перед выполнением запроса
        .addCase(USER_RESET_CONFIRM.pending, (state) => ({
            ...state,
            status: {
                ...state.status,
                reset_confirm: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        }))
        // Вызывается в том случае если запрос успешно выполнился
        .addCase(USER_RESET_CONFIRM.fulfilled, (state, action) => ({
            ...state,
            status: {
                ...state.status,
                reset: {
                    loading: false,
                    error: false,
                    success: false,
                },
                reset_confirm: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        }))
        // Вызывается в случае ошибки
        .addCase(USER_RESET_CONFIRM.rejected, (state) => ({
            ...state,
            status: {
                ...state.status,
                reset_confirm: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        }))

        // ===============================
        // ===== логаут пользователя =====
        // ===============================

        // Вызывается прямо перед выполнением запроса
        .addCase(USER_LOGOUT.pending, (state) => ({
            ...state,
            status: {
                ...state.status,
                logout: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        }))
        // Вызывается в том случае если запрос успешно выполнился
        .addCase(USER_LOGOUT.fulfilled, (state, action) => {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            return {
                ...state,
                user: initialState.user,
                status: {
                    ...state.status,
                    logout: {
                        loading: false,
                        error: false,
                        success: true,
                    },
                },
            };
        })
        // Вызывается в случае ошибки
        .addCase(USER_LOGOUT.rejected, (state) => ({
            ...state,
            status: {
                ...state.status,
                logout: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        }))

        // =====================================================================
        // ====== оправка отредактированных данных пользователя на сервер ======
        // =====================================================================

        // Вызывается прямо перед выполнением запроса
        .addCase(USER_UPDATE.pending, (state) => ({
            ...state,
            status: {
                ...state.status,
                update: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        }))
        // Вызывается в том случае если запрос успешно выполнился
        .addCase(USER_UPDATE.fulfilled, (state, action) => ({
            // Добавляем пользователя
            ...state,
            user: action.payload.user,
            status: {
                ...state.status,
                update: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        }))
        // Вызывается в случае ошибки
        .addCase(USER_UPDATE.rejected, (state) => ({
            ...state,
            status: {
                ...state.status,
                update: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        }))

        .addDefaultCase((state) => state);
});
