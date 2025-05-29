import { FC, memo, useCallback, useEffect, useLayoutEffect } from "react";
import {
    Route,
    Routes,
    useLocation,
    useNavigate,
    useNavigationType,
} from "react-router-dom";
import {
    ErrorNotFoundPage,
    FeedPage,
    ForgotPasswordPage,
    HomePage,
    IngredientDetailsPages,
    LoginPage,
    OrderDetailsPage,
    OrdersPage,
    ProfileLayoutPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
} from "../../pages";
import { USER_CHECK_AUTH } from "../../services/auth/actions";
import { INGREDIENTS_REQEST } from "../../services/ingredients-list/actions";
import { getIngredientsRequestSuccess } from "../../services/ingredients-list/selectors";
import { MOBILE_TURN_OFF, MOBILE_TURN_ON } from "../../services/mobile/actions";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
    _ALL_PATH,
    _FEED_PATH,
    _FORGOT_PASS_PATH,
    _HOME_PATH,
    _ID_PATH,
    _INGREDIENTS_PATH,
    _LOGIN_PATH,
    MOBILE_BREAKPOINT,
    _ORDERS_PATH,
    _PROFILE_PATH,
    _REGISTER_PATH,
    _RESET_PASS_PATH,
    ALL_PATH,
    ORDERS_PATH,
    PUSH,
} from "../../utils/vars";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Loading from "../loading/loading";
import Modal from "../modals/modal/modal";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";

const App: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();

    // проверяем токен пользователя
    useEffect(() => {
        dispatch(USER_CHECK_AUTH());
    }, [dispatch]);

    // меняем стор при проходждении брейкпойнта
    const resizeFunc = useCallback(() => {
        window.innerWidth <= MOBILE_BREAKPOINT && !isMobile
            ? dispatch(MOBILE_TURN_ON())
            : window.innerWidth > MOBILE_BREAKPOINT &&
              isMobile &&
              dispatch(MOBILE_TURN_OFF());
    }, [dispatch, isMobile]);

    // перед рендером надо узнать разрешение экрана
    useLayoutEffect(() => {
        resizeFunc();
    }, [resizeFunc]);

    // вешаем лисенер на ресайз
    useEffect(() => {
        window.addEventListener("resize", resizeFunc, { passive: true });

        // снимаем лисенер на ресайз
        return () => {
            window.removeEventListener("resize", resizeFunc);
        };
    });

    // получаем данные игредиентов по API, если еще не получены
    const requestSuccess: boolean = useAppSelector(
        getIngredientsRequestSuccess
    );
    useEffect(() => {
        if (!requestSuccess) dispatch(INGREDIENTS_REQEST());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // для модалок
    const navigationType = useNavigationType();
    const location = useLocation();

    // а здесь пришлось сделать некрасиво, но оно работает %)
    // в общем, если было обновление страницы с `backgroundLocation` на странице ленты заказов - чистим `state`
    // иначе - пускай себе открывается в модалке со бэкграндом в стейте
    const state =
        navigationType !== PUSH &&
        (location.state?.backgroundLocation?.pathname === _FEED_PATH ||
            location.state?.backgroundLocation?.pathname ===
                _PROFILE_PATH + _ORDERS_PATH)
            ? null
            : (location.state as {
                  backgroundLocation?: Location;
              });

    // закрытие модалки
    let navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    return (
        <>
            <AppHeader />

            {requestSuccess ? (
                <main
                    className={isMobile ? "pt-4 pl-4 pr-4" : "pt-10 pl-5 pr-5"}
                >
                    {/* основные роуты */}
                    <Routes location={state?.backgroundLocation || location}>
                        <Route path={_HOME_PATH} element={<HomePage />} />
                        <Route
                            path={_LOGIN_PATH}
                            element={<OnlyUnAuth component={<LoginPage />} />}
                        />
                        <Route
                            path={_REGISTER_PATH}
                            element={
                                <OnlyUnAuth component={<RegisterPage />} />
                            }
                        />
                        <Route
                            path={_FORGOT_PASS_PATH}
                            element={
                                <OnlyUnAuth
                                    component={<ForgotPasswordPage />}
                                />
                            }
                        />
                        <Route
                            path={_RESET_PASS_PATH}
                            element={
                                <OnlyUnAuth component={<ResetPasswordPage />} />
                            }
                        />
                        <Route
                            path={_INGREDIENTS_PATH + _ID_PATH}
                            element={<IngredientDetailsPages />}
                        />
                        <Route path={_FEED_PATH} element={<FeedPage />} />
                        <Route
                            path={_FEED_PATH + _ID_PATH}
                            element={<OrderDetailsPage />}
                        />
                        <Route
                            path={_PROFILE_PATH}
                            element={
                                <OnlyAuth component={<ProfileLayoutPage />} />
                            }
                        >
                            <Route index element={<ProfilePage />} />
                            <Route
                                path={ORDERS_PATH}
                                element={
                                    <OnlyAuth component={<OrdersPage />} />
                                }
                            />

                            <Route
                                path={ALL_PATH}
                                element={<ErrorNotFoundPage />}
                            />
                        </Route>
                        <Route
                            path={_PROFILE_PATH + _ORDERS_PATH + _ID_PATH}
                            element={
                                <OnlyAuth component={<OrderDetailsPage />} />
                            }
                        />
                        <Route
                            path={_ALL_PATH}
                            element={<ErrorNotFoundPage />}
                        />
                    </Routes>

                    {/* модалки */}
                    {state?.backgroundLocation && (
                        <Routes>
                            <Route
                                path={_INGREDIENTS_PATH + _ID_PATH}
                                element={
                                    <Modal
                                        closeModal={() => closeModal()}
                                        title="Детали ингредиента"
                                    >
                                        <IngredientDetails />
                                    </Modal>
                                }
                            />
                            <Route
                                path={_FEED_PATH + _ID_PATH}
                                element={
                                    <Modal closeModal={() => closeModal()}>
                                        <OrderDetailsPage modal />
                                    </Modal>
                                }
                            />
                            <Route
                                path={_PROFILE_PATH + _ORDERS_PATH + _ID_PATH}
                                element={
                                    <Modal closeModal={() => closeModal()}>
                                        <OnlyAuth
                                            component={
                                                <OrderDetailsPage modal />
                                            }
                                        />
                                    </Modal>
                                }
                            />
                        </Routes>
                    )}
                </main>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default memo(App);
