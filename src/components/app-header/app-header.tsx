import {
    ArrowDownIcon,
    ArrowUpIcon,
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo, useEffect, useState } from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import logoMobile from "../../images/logo__mobile.svg";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { _FEED_PATH, _HOME_PATH, _PROFILE_PATH } from "../../utils/vars";
import ProfileNav from "../profile-nav/profile-nav";
import styles from "./app-header.module.scss";
import BurgerBtn from "./burger-btn";

const AppHeader: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    // дла определения цвета иконов в меню
    const matchContructor = useMatch("/");
    const matchFeed = useMatch("/feed");
    const matchProfile = useMatch("/profile/*");

    // для меню для мобилок
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    // тоглим меню для мобилок при клике по кнопке бургера
    const clickBurger = () => setIsMenuOpen(!isMenuOpen);
    const clickProfile = () => setIsSubMenuOpen(!isSubMenuOpen);

    // закрвыаем меню для мобилок изменении роута
    useEffect(() => {
        setIsMenuOpen(false);
    }, [matchContructor, matchFeed, matchProfile]);

    return (
        <header className={styles.header}>
            <div className={`pt-4 pb-4 ${styles.container}`}>
                {isMobile ? (
                    // лого для мобилок
                    <>
                        <Link
                            className={`${styles.logo__mobile} ml-3 mr-3 ${
                                isMenuOpen ? styles.hide : ""
                            }`}
                            to={_HOME_PATH}
                        >
                            <img src={logoMobile} alt="logo" />
                        </Link>
                        <BurgerBtn
                            click={clickBurger}
                            isMenuOpen={isMenuOpen}
                        />
                    </>
                ) : (
                    // лого для десктопа
                    <Link className={styles.logo} to={_HOME_PATH}>
                        <Logo />
                    </Link>
                )}

                <nav
                    className={`${styles.nav} ${
                        isMobile && styles.nav__mobile
                    } ${isMenuOpen && styles.active}`}
                >
                    {isMobile && (
                        <p
                            className={`${styles.nav__title} text text_type_main-medium mt-4 mb-4 ml-5 mr-5`}
                        >
                            Меню
                        </p>
                    )}
                    <ul className={styles.list}>
                        {/* мобильное меню */}
                        {isMobile && (
                            <>
                                <li>
                                    <span
                                        className={`${
                                            matchProfile
                                                ? styles.active
                                                : "text_color_inactive"
                                        } ${
                                            styles.link
                                        } text text_type_main-default  mt-4 mb-4 ml-5 mr-5 remove-select `}
                                        onClick={clickProfile}
                                    >
                                        <ProfileIcon
                                            type={
                                                matchProfile
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                        />
                                        <span className="ml-2 mr-2">
                                            Личный кабинет
                                        </span>
                                        {isSubMenuOpen ? (
                                            <ArrowUpIcon
                                                type={
                                                    matchProfile
                                                        ? "primary"
                                                        : "secondary"
                                                }
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                type={
                                                    matchProfile
                                                        ? "primary"
                                                        : "secondary"
                                                }
                                            />
                                        )}
                                    </span>
                                </li>

                                <ProfileNav isSubMenuOpen={isSubMenuOpen} />
                            </>
                        )}

                        {/* основное меню */}
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? styles.active
                                            : "text_color_inactive"
                                    } ${
                                        styles.link
                                    } text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
                                }
                                to={_HOME_PATH}
                            >
                                <BurgerIcon
                                    type={
                                        matchContructor
                                            ? "primary"
                                            : "secondary"
                                    }
                                />
                                <span className="ml-2">Конструктор</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? styles.active
                                            : "text_color_inactive"
                                    } ${
                                        styles.link
                                    } text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
                                }
                                to={_FEED_PATH}
                            >
                                <ListIcon
                                    type={matchFeed ? "primary" : "secondary"}
                                />
                                <span className="ml-2">Лента заказов</span>
                            </NavLink>
                        </li>
                        {!isMobile && (
                            <li className={styles.profile}>
                                <NavLink
                                    className={({ isActive }) =>
                                        `${
                                            isActive
                                                ? styles.active
                                                : "text_color_inactive"
                                        } ${
                                            styles.link
                                        } text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
                                    }
                                    to={_PROFILE_PATH}
                                >
                                    <ProfileIcon
                                        type={
                                            matchProfile
                                                ? "primary"
                                                : "secondary"
                                        }
                                    />
                                    <span className="ml-2">Личный кабинет</span>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default memo(AppHeader);
