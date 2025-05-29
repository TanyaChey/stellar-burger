import { FC, memo } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { USER_LOGOUT } from "../../services/auth/actions";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { _ORDERS_PATH, _PROFILE_PATH } from "../../utils/vars";
import styles from "./profile-nav.module.scss";

interface IProps {
    isSubMenuOpen?: boolean;
}

const ProfileNav: FC<IProps> = ({ isSubMenuOpen }) => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();
    const logout = () => {
        dispatch(USER_LOGOUT());
    };
    const isProfile = useMatch("/profile");
    return (
        <nav
            className={`${styles.nav} mr-15 ${
                isMobile ? styles.nav__submenu : "mt-20"
            } ${isMobile ? "ml-8" : ""} ${isSubMenuOpen ? styles.active : ""}`}
        >
            <ul className={styles.nav__list}>
                <li
                    className={`${styles.nav__list__item} ${
                        isMobile ? styles.mobile : ""
                    }`}
                >
                    <NavLink
                        className={({ isActive }) =>
                            `${
                                isActive ? styles.active : "text_color_inactive"
                            } 
              ${styles.link} text ${
                                !isMobile
                                    ? "text_type_main-medium"
                                    : "text_type_main-default   mt-4 mb-4 ml-5 mr-5"
                            }`
                        }
                        to={_PROFILE_PATH}
                        end={true}
                    >
                        Профиль
                    </NavLink>
                </li>
                <li className={`${styles.nav__list__item}`}>
                    <NavLink
                        className={({ isActive }) =>
                            `${
                                isActive ? styles.active : "text_color_inactive"
                            } 
              ${styles.link} text ${
                                !isMobile
                                    ? "text_type_main-medium"
                                    : "text_type_main-default   mt-4 mb-4 ml-5 mr-5"
                            }`
                        }
                        to={_PROFILE_PATH + _ORDERS_PATH}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li className={`${styles.nav__list__item}  mb-20`}>
                    <span
                        className={`${styles.link} text_color_inactive  text ${
                            !isMobile
                                ? "text_type_main-medium"
                                : "text_type_main-default   mt-4 mb-4 ml-5 mr-5"
                        }`}
                        onClick={logout}
                    >
                        Выход
                    </span>
                </li>
            </ul>
            {!isMobile && (
                <span className="text text_type_main-default text_color_inactive">
                    {isProfile
                        ? "В этом разделе вы можете изменить свои персональные данные"
                        : "В этом разделе вы можете просмотреть свою историю заказов"}
                </span>
            )}
        </nav>
    );
};

export default memo(ProfileNav);
