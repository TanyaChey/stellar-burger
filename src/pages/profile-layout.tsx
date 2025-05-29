import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import ProfileNav from "../components/profile-nav/profile-nav";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";
import styles from "./profile-layout.module.scss";

const ProfileLayoutPage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    return (
        <section
            className={`${styles.section} ${
                isMobile ? styles.section__mobile : ""
            }`}
        >
            {!isMobile && <ProfileNav />}
            <Outlet />
        </section>
    );
};

export default memo(ProfileLayoutPage);
