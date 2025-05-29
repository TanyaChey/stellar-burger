import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getUserEmail, getUserName } from "../services/auth/selectors";
import { useAppSelector } from "../services/store/hooks";

export const useForm = () => {
    const formRef = useRef<HTMLFormElement>(null);

    // заполняем данные в профиле, если пользователь авторизован
    const userName = useAppSelector(getUserName);
    const userEmail = useAppSelector(getUserEmail);

    let initialSate = {
        name: userName || "",
        email: userEmail || "",
        password: "",
        code: "",
    };

    useEffect(() => {
        if (userName && userEmail) {
            setFormState({
                ...formState,
                name: userName,
                email: userEmail,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail, userName]);

    const [formState, setFormState] = useState(initialSate);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleReset = (e: { preventDefault: () => void }) => {
        setFormState(initialSate);
    };

    // копипастим логику блокировки инпукта из UI кита Яндекс из EmailInput и PasswordInput
    // ибо почему-то в обычный input ее не предусмотрели
    const refNameInput = useRef<HTMLInputElement>(null);
    const [isDisabledNameInput, setDisabledNameInput] = useState(true);
    const unlockNameInput = () => {
        setTimeout(() => refNameInput.current?.focus(), 0);
        setDisabledNameInput(false);
    };
    const lockNameInput = () => {
        setDisabledNameInput(true);
    };

    return {
        formRef,
        formState,
        handleChange,
        handleReset,
        refNameInput,
        isDisabledNameInput,
        unlockNameInput,
        lockNameInput,
    };
};
