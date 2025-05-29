import { createSelector } from "@reduxjs/toolkit";
import { TUser } from "./reducer";
import { RootState } from "../store/hooks";

// ==========================
// ===== маркер запроса =====
// ==========================
export const getIsAuthChecked = createSelector(
    (store: RootState): boolean => store.user.isAuthChecked,
    (data): boolean => data
);

// =========================================
// ===== статус запроса пользотвателя =====
// =========================================
export const getUserGetInfoIsLoading = createSelector(
    (store: RootState): boolean => store.user.status.get_info.loading,
    (data): boolean => data
);
export const getUserGetInfoHasError = createSelector(
    (store: RootState): boolean => store.user.status.get_info.error,
    (data): boolean => data
);
export const getUserGetInfoRequestSuccess = createSelector(
    (store: RootState): boolean => store.user.status.get_info.success,
    (data): boolean => data
);

// =========================================
// ===== статус запроса на регистрацию =====
// =========================================
export const getUserRegisterIsLoading = createSelector(
    (store: RootState): boolean => store.user.status.register.loading,
    (data): boolean => data
);
export const getUserRegisterHasError = createSelector(
    (store: RootState): boolean => store.user.status.register.error,
    (data): boolean => data
);
export const getUserRegisterRequestSuccess = createSelector(
    (store: RootState): boolean => store.user.status.register.success,
    (data): boolean => data
);

// =========================================
// ===== статус запроса на авторизацию =====
// =========================================
export const getUserLoginIsLoading = createSelector(
    (store: RootState): boolean => store.user.status.login.loading,
    (data): boolean => data
);
export const getUserLoginHasError = createSelector(
    (store: RootState): boolean => store.user.status.login.error,
    (data): boolean => data
);
export const getUserLoginRequestSuccess = createSelector(
    (store: RootState): boolean => store.user.status.login.success,
    (data): boolean => data
);

// ====================================================
// ===== статус запроса на восстановаление пароля =====
// ====================================================
export const getUserResetIsLoading = createSelector(
    (store: RootState): boolean => store.user.status.reset.loading,
    (data): boolean => data
);
export const getUserResetHasError = createSelector(
    (store: RootState): boolean => store.user.status.reset.error,
    (data): boolean => data
);
export const getUserResetRequestSuccess = createSelector(
    (store: RootState): boolean => store.user.status.reset.success,
    (data): boolean => data
);

// ==================================================
// ===== статус запроса на запись нового пароля =====
// ==================================================
export const getUserResetConfirmIsLoading = createSelector(
    (store: RootState): boolean => store.user.status.reset_confirm.loading,
    (data): boolean => data
);
export const getUserResetConfirmHasError = createSelector(
    (store: RootState): boolean => store.user.status.reset_confirm.error,
    (data): boolean => data
);
export const getUserResetConfirmRequestSuccess = createSelector(
    (store: RootState): boolean => store.user.status.reset_confirm.success,
    (data): boolean => data
);

// ============================================================
// ===== статус запроса на обновление данных пользователя =====
// ============================================================
export const getUserUpdateIsLoading = createSelector(
    (store: RootState): boolean => store.user.status.update.loading,
    (data): boolean => data
);
export const getUserUpdateHasError = createSelector(
    (store: RootState): boolean => store.user.status.update.error,
    (data): boolean => data
);
export const getUserUpdateRequestSuccess = createSelector(
    (store: RootState): boolean => store.user.status.update.success,
    (data): boolean => data
);

// =======================================================================
// ===== получение данных пользователя из стора для страницы профиля =====
// =======================================================================
export const getUser = createSelector(
    (store: RootState): TUser | null => store.user.user,
    (data): TUser | null => data
);
export const getUserName = createSelector(
    (store: RootState): string | undefined => store.user.user?.name,
    (data): string | undefined => data
);
export const getUserEmail = createSelector(
    (store: RootState): string | undefined => store.user.user?.email,
    (data): string | undefined => data
);
