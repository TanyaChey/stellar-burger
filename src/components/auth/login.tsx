import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { USER_LOGIN } from "../../services/auth/actions";
import {
    getUserLoginHasError,
    getUserLoginIsLoading,
} from "../../services/auth/selectors";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { _FORGOT_PASS_PATH, _REGISTER_PATH } from "../../utils/vars";
import Notice from "../modals/notice/notice";
import styles from "./auth.module.scss";

const Login: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getUserLoginIsLoading);
    const hasError = useAppSelector(getUserLoginHasError);

    // работаем с формой
    const { formRef, formState, handleChange } = useForm();
    const isFormFilled = formState.email && formState.password;
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (isFormFilled) {
            const sendData = {
                email: formState.email,
                password: formState.password,
            };
            dispatch(USER_LOGIN(sendData));
        }
    };

    return (
        <>
            <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
                <EmailInput
                    onChange={handleChange}
                    value={formState.email}
                    name={"email"}
                    isIcon={false}
                    size={`${isMobile ? "small" : "default"}`}
                    extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
                    width="100%"
                    autoComplete="on"
                />
                <PasswordInput
                    onChange={handleChange}
                    value={formState.password}
                    name={"password"}
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
                    {isLoading ? "Загрузка" : "Войти"}
                </Button>
                <span className="align-center mb-4">
                    <span
                        className={`text text_type_main-default text_color_inactive ${
                            !isMobile ? "mr-2" : "section-auth__span-mobile"
                        }`}
                    >
                        Вы — новый пользователь?
                    </span>
                    <Link
                        to={_REGISTER_PATH}
                        className="text_type_main-default "
                    >
                        Зарегистрироваться
                    </Link>
                </span>
                <span className="align-center mb-4">
                    <span
                        className={`text text_type_main-default text_color_inactive ${
                            !isMobile ? "mr-2" : "section-auth__span-mobile"
                        }`}
                    >
                        Забыли пароль?
                    </span>
                    <Link
                        to={_FORGOT_PASS_PATH}
                        className="text_type_main-default"
                    >
                        Восстановить пароль
                    </Link>
                </span>
            </form>

            {hasError && (
                <Notice text="Неверный логин или пароль" type="error" />
            )}
        </>
    );
};

export default memo(Login);
