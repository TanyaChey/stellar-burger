import {
    Button,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo } from "react";
import { Link, Navigate } from "react-router-dom";
import { USER_RESET_CONFIRM } from "../../services/auth/actions";
import {
    getUserResetConfirmHasError,
    getUserResetConfirmIsLoading,
    getUserResetConfirmRequestSuccess,
    getUserResetRequestSuccess,
} from "../../services/auth/selectors";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { _FORGOT_PASS_PATH, _LOGIN_PATH } from "../../utils/vars";
import Notice from "../modals/notice/notice";
import styles from "./auth.module.scss";

const ResetPassword: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getUserResetConfirmIsLoading);
    const hasError = useAppSelector(getUserResetConfirmHasError);
    const resetConfirmRequestSuccess = useAppSelector(
        getUserResetConfirmRequestSuccess
    );
    const resetRequestSuccess = useAppSelector(getUserResetRequestSuccess);

    // работаем с формой
    const { formRef, formState, handleChange } = useForm();
    const isFormFilled = formState.password && formState.code;
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (isFormFilled) {
            const sendData = {
                password: formState.password,
                token: formState.code,
            };
            dispatch(USER_RESET_CONFIRM(sendData));
        }
    };

    return (
        <>
            {!resetRequestSuccess && <Navigate to={_FORGOT_PASS_PATH} />}

            {resetRequestSuccess && (
                <form
                    className={styles.form}
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <PasswordInput
                        onChange={handleChange}
                        value={formState.password}
                        name={"password"}
                        placeholder={"Введите новый пароль"}
                        size={`${isMobile ? "small" : "default"}`}
                        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
                        autoComplete="on"
                    />
                    <Input
                        type={"text"}
                        placeholder={"Введите код из письма"}
                        onChange={handleChange}
                        value={formState.code}
                        name={"code"}
                        error={false}
                        errorText={"Ошибка"}
                        size={`${isMobile ? "small" : "default"}`}
                        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
                        autoComplete="on"
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        size={`${!isMobile ? "medium" : "small"}`}
                        extraClass={`${!isMobile ? "mb-20" : "mb-10"} ${
                            isLoading ? "button-locked" : ""
                        } ${isFormFilled ? "" : "button-locked"}`}
                    >
                        {isLoading ? "Загрузка" : "Сохранить"}
                    </Button>
                    <span className="align-center mb-4">
                        <span
                            className={`text text_type_main-default text_color_inactive ${
                                !isMobile ? "mr-2" : "section-auth__span-mobile"
                            }`}
                        >
                            Вспомнили пароль?
                        </span>
                        <Link
                            to={_LOGIN_PATH}
                            className="text_type_main-default "
                        >
                            Войти
                        </Link>
                    </span>
                </form>
            )}

            {resetRequestSuccess && (
                <Notice text="На указанные Email выслан код подтверждения" />
            )}
            {hasError && <Notice text="Указан неверный код" type="error" />}

            {resetConfirmRequestSuccess && <Navigate to={_LOGIN_PATH} />}
        </>
    );
};

export default memo(ResetPassword);
