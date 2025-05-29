import { FC, memo } from "react";
import { Register } from "../components/auth/";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";

const RegisterPage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    return (
        <section className={`section-auth ${!isMobile ? "mt-10" : ""}`}>
            <h3 className="text text_type_main-large mb-6 align-center">
                Регистрация
            </h3>
            <Register />
        </section>
    );
};

export default memo(RegisterPage);
