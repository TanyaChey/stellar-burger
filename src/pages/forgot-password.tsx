import { FC, memo } from "react";
import { ForgotPassword } from "../components/auth";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";

const ForgotPasswordPage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    return (
        <section className={`section-auth ${!isMobile ? "mt-10" : ""}`}>
            <h3 className="text text_type_main-large mb-6 align-center">
                Восстановление пароля
            </h3>
            <ForgotPassword />
        </section>
    );
};

export default memo(ForgotPasswordPage);
