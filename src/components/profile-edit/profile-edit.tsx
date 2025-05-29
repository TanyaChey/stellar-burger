import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo } from "react";
import { USER_UPDATE } from "../../services/auth/actions";
import {
    getUserEmail,
    getUserName,
    getUserUpdateHasError,
    getUserUpdateIsLoading,
    getUserUpdateRequestSuccess,
} from "../../services/auth/selectors";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import Notice from "../modals/notice/notice";
import styles from "./profile-edit.module.scss";

const ProfileEdit: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const userName = useAppSelector(getUserName);
    const userEmail = useAppSelector(getUserEmail);
    const dispatch = useAppDispatch();
    const userUpdateIsLoading = useAppSelector(getUserUpdateIsLoading);
    const userUpdateHasError = useAppSelector(getUserUpdateHasError);
    const userUpdateRequestSuccess = useAppSelector(
        getUserUpdateRequestSuccess
    );

    // работаем с формой
    const {
        formRef,
        formState,
        handleChange,
        handleReset,
        refNameInput,
        isDisabledNameInput,
        unlockNameInput,
        lockNameInput,
    } = useForm();

    const isFormChange =
        userName !== formState.name ||
        userEmail !== formState.email ||
        formState.password;

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (isFormChange) {
            const sendData = {
                name: formState.name,
                email: formState.email,
                password: formState.password,
            };
            dispatch(USER_UPDATE(sendData));
            // а это чисто для очистики инпута пароля - для красоты
            handleReset(e);
        }
    };

    return (
        <>
            <form
                className={isMobile ? styles.form__mobile : "mt-20"}
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={handleChange}
                    value={formState.name}
                    name={"name"}
                    error={false}
                    errorText={"Ошибка"}
                    size={`${isMobile ? "small" : "default"}`}
                    icon={"EditIcon"}
                    disabled={isDisabledNameInput}
                    ref={refNameInput}
                    onIconClick={unlockNameInput}
                    onBlur={lockNameInput}
                    extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
                    autoComplete="on"
                />
                <EmailInput
                    onChange={handleChange}
                    value={formState.email}
                    name={"email"}
                    isIcon={true}
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
                    icon={"EditIcon"}
                    extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
                    autoComplete="on"
                />
                <span
                    className={
                        !isMobile ? styles.buttons : styles.buttons__mobile
                    }
                >
                    {/* позволил себе отступить от требований ТЗ по скрытию кнопок,
                    чтобы сохранить общую анимационную стилистику между всеми формами в проекте.
                    тем не менее - функцлионал кнопок блокриуется, как и задумано по ТЗ. */}
                    <Button
                        htmlType="button"
                        type="secondary"
                        size={`${!isMobile ? "medium" : "small"}`}
                        extraClass={`mb-2 ${
                            isFormChange ? "" : "button-locked"
                        } ${userUpdateIsLoading ? "button-locked" : ""}`}
                        onClick={handleReset}
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size={`${!isMobile ? "medium" : "small"}`}
                        extraClass={`mb-2 ${
                            isFormChange ? "" : "button-locked"
                        } ${userUpdateIsLoading ? "button-locked" : ""}`}
                    >
                        {userUpdateIsLoading ? "Загрузка" : "Сохранить"}
                    </Button>
                </span>
            </form>

            {userUpdateRequestSuccess && (
                <Notice text="Данные успешно обновлены" />
            )}
            {userUpdateHasError && (
                <Notice text="Произошла ошибка" type="error" />
            )}
        </>
    );
};

export default memo(ProfileEdit);
