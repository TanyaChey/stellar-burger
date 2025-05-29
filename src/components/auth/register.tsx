import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { USER_REGISTER } from "../../services/auth/actions";
import {
    getUserRegisterHasError,
    getUserRegisterIsLoading,
} from "../../services/auth/selectors";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { _LOGIN_PATH } from "../../utils/vars";
import Notice from "../modals/notice/notice";
import styles from "./auth.module.scss";

const Register: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getUserRegisterIsLoading);
    const hasError = useAppSelector(getUserRegisterHasError);

    // работаем с формой
    const { formRef, formState, handleChange } = useForm();
    const isFormFilled =
        formState.name && formState.email && formState.password;
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (isFormFilled) {
            const sendData = {
                email: formState.email,
                password: formState.password,
                name: formState.name,
            };
            dispatch(USER_REGISTER(sendData));
        }
    };

    return (
        <>
            <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={handleChange}
                    value={formState.name}
                    name={"name"}
                    error={false}
                    errorText={"Ошибка"}
                    size={`${isMobile ? "small" : "default"}`}
                    extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
                    autoComplete="on"
                />
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
                    {isLoading ? "Загрузка" : "Зарегистрироваться"}
                </Button>

                <span className={`align-center mb-4`}>
                    <span
                        className={`text text_type_main-default text_color_inactive ${
                            !isMobile ? "mr-2" : "section-auth__span-mobile"
                        }`}
                    >
                        Уже зарегистрированы?
                    </span>
                    <Link to={_LOGIN_PATH} className="text_type_main-default ">
                        Войти
                    </Link>
                </span>
            </form>
            {hasError && (
                <Notice
                    text="Такой пользователь уже зарегистрирован"
                    type="error"
                />
            )}
        </>
    );
};

export default memo(Register);
