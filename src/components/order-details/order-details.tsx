import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, Key, memo, useEffect, useMemo } from "react";
import { useMatch, useParams } from "react-router-dom";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
    _ALL_PATH,
    _FEED_PATH,
    _ORDERS_PATH,
    _PROFILE_PATH,
} from "../../utils/vars";
import Loading from "../loading/loading";
import OrderDetailsElement from "../order-details-element/order-details-element";
import styles from "./order-details.module.scss";
import { getFeedOrderById } from "../../services/feed-orders/selectors";
import { OrderStatus, TFeedOrder } from "../../utils/types";
import { getProfileOrderById } from "../../services/profile-orders/selectors";
import OrderTotalPrice from "../order-total-price/order-total-price";
import {
    ORDER_REQEST,
    ORDER_RESET,
} from "../../services/order-details/actions";
import {
    getOrderDetails,
    getOrderDetailsHasError,
    getOrderDetailsIsLoading,
} from "../../services/order-details/selectors";
import { ErrorNotFoundPage } from "../../pages";

interface IProps {
    modal?: boolean;
}

const OrderDetails: FC<IProps> = ({ modal }) => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();
    const feedMatch = useMatch(_FEED_PATH + _ALL_PATH);
    const ordersMatch = useMatch(_PROFILE_PATH + _ORDERS_PATH + _ALL_PATH);
    const { id } = useParams();

    const orderApi = useAppSelector(getOrderDetails);

    const isLoading: boolean = useAppSelector(getOrderDetailsIsLoading);
    const hasError: boolean = useAppSelector(getOrderDetailsHasError);

    const feedOrder: TFeedOrder | undefined = useAppSelector(
        getFeedOrderById(Number(id))
    );

    const profileOrder: TFeedOrder | undefined = useAppSelector(
        getProfileOrderById(Number(id))
    );

    useEffect(() => {
        !feedOrder && !profileOrder && dispatch(ORDER_REQEST(Number(id)));
        return () => {
            !feedOrder && !profileOrder && dispatch(ORDER_RESET());
        };
    }, [dispatch, feedOrder, id, profileOrder]);

    // определяем URL и решаем откуда тянуть данные
    const orderDetails =
        feedMatch && feedOrder
            ? feedOrder
            : ordersMatch && profileOrder
            ? profileOrder
            : orderApi
            ? orderApi
            : null;

    // создадим новый массив без дубликтов ингредиентов
    const ordersUnic = useMemo(
        () =>
            orderDetails?.ingredients.filter(
                (it, index) =>
                    index ===
                    orderDetails?.ingredients.indexOf((it = it.trim()))
            ),
        [orderDetails?.ingredients]
    );

    // статус заказа
    const status = useMemo(() => {
        switch (orderDetails?.status) {
            case OrderStatus.DONE:
                return "Готов";
            case OrderStatus.PENDING:
                return "Готовится";
            case OrderStatus.CANCELED:
                return "Отменен";
            default:
                return "Создан";
        }
    }, [orderDetails?.status]);

    return (
        <>
            {orderDetails ? (
                <section
                    className={`${styles.section} ${
                        !isMobile && !modal
                            ? "mt-15"
                            : !isMobile && modal
                            ? "mt-5"
                            : "mt-4"
                    } ${
                        isMobile ? styles.section__mobile : ""
                    } ml-auto mr-auto`}
                >
                    {!modal && (
                        <p
                            className={`${!isMobile ? "mb-10" : "mb-6"} ${
                                !isMobile ? "align-center" : ""
                            } text text_type_digits-default`}
                        >
                            #{orderDetails.number}
                        </p>
                    )}

                    <h3
                        className={`${
                            !isMobile ? "mb-3" : "mb-2"
                        } text text_type_main-medium`}
                    >
                        {orderDetails.name}
                    </h3>
                    <p
                        className={`${
                            !isMobile ? "mb-15" : "mb-6"
                        } text text_type_main-default`}
                    >
                        {status}
                    </p>
                    <h3
                        className={`${
                            !isMobile ? "mb-6" : "mb-4"
                        } text text_type_main-medium`}
                    >
                        Состав:
                    </h3>
                    <div
                        className={`${styles.ingredients} ${
                            !isMobile
                                ? "pr-6 mb-10"
                                : styles.ingredients__mobile
                        } custom-scroll`}
                    >
                        {ordersUnic?.map((id: string, index: Key) => (
                            <OrderDetailsElement
                                itemId={id}
                                key={index}
                                ingredientsList={orderDetails.ingredients}
                            />
                        ))}
                    </div>
                    <span
                        className={`${styles.footer} ${
                            isMobile ? styles.footer__mobile : ""
                        }`}
                    >
                        <p className="text text_type_main-default text_color_inactive">
                            <FormattedDate
                                date={new Date(orderDetails.createdAt)}
                            />
                        </p>
                        <p
                            className={`${styles.price} text text_type_digits-default ml-6`}
                        >
                            {/* <span className="mr-2">{orderDetails.price}</span> */}
                            <OrderTotalPrice
                                ingredients={orderDetails.ingredients}
                            />
                            <CurrencyIcon type="primary" />
                        </p>
                    </span>
                </section>
            ) : isLoading ? (
                <Loading />
            ) : hasError ? (
                <Loading>Ошибка загрузки</Loading>
            ) : (
                <ErrorNotFoundPage />
            )}
        </>
    );
};

export default memo(OrderDetails);
