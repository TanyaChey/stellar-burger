import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo } from "react";
import { Link, Navigate } from "react-router-dom";
import { USER_RESET } from "../../services/auth/actions";
import {
    getUserResetHasError,
    getUserResetIsLoading,
    getUserResetRequestSuccess,
} from "../../services/auth/selectors";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { _LOGIN_PATH, _RESET_PASS_PATH } from "../../utils/vars";
import Notice from "../modals/notice/notice";
import styles from "./auth.module.scss";

const ResetPass: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const isLoading: boolean = useAppSelector(getUserResetIsLoading);
    const hasError: boolean = useAppSelector(getUserResetHasError);
    const requestSuccess: boolean = useAppSelector(getUserResetRequestSuccess);
    const dispatch = useAppDispatch();

    // работаем с формой
    const { formRef, formState, handleChange } = useForm();
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (formState.email) {
            const sendData = {
                email: formState.email,
            };
            dispatch(USER_RESET(sendData));
        }
    };

    return (
        <>
            <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
                <EmailInput
                    onChange={handleChange}
                    value={formState.email}
                    name={"email"}
                    placeholder="Укажите e-mail"
                    isIcon={false}
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
                    } ${formState.email ? "" : "button-locked"}`}
                >
                    {isLoading ? "Загрузка" : "Восстановить"}
                </Button>
                <span className="align-center mb-4">
                    <span
                        className={`text text_type_main-default text_color_inactive ${
                            !isMobile ? "mr-2" : "section-auth__span-mobile"
                        }`}
                    >
                        Вспомнили пароль?
                    </span>
                    <Link to={_LOGIN_PATH} className="text_type_main-default ">
                        Войти
                    </Link>
                </span>
            </form>

            {hasError && (
                <Notice
                    text="Email не найден в базе пользователей"
                    type="error"
                />
            )}

            {requestSuccess && <Navigate to={_RESET_PASS_PATH} />}
        </>
    );
};

export default memo(ResetPass);
