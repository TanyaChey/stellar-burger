import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, Key, memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getImagesByIngredientIds } from "../../services/ingredients-list/selectors";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import OrderDetailsImg from "../order-details-img/order-details-img";
import styles from "./orders-list-element.module.scss";
import { OrderStatus, TFeedOrder } from "../../utils/types";
import OrderTotalPrice from "../order-total-price/order-total-price";

interface IProps {
    item: TFeedOrder;
}

const OrdersListElement: FC<IProps> = ({ item }) => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const images: (string | undefined)[] = useAppSelector(
        getImagesByIngredientIds(item.ingredients)
    );
    const location = useLocation();

    const status = useMemo(() => {
        switch (item.status) {
            case OrderStatus.DONE:
                return "Готов";
            case OrderStatus.PENDING:
                return "Готовится";
            case OrderStatus.CANCELED:
                return "Отменен";
            default:
                return "Создан";
        }
    }, [item.status]);

    return (
        <>
            {!images.includes(undefined) ? (
                <Link
                    className={`${styles.item} ${
                        !isMobile ? "p-6 mb-6" : "p-4 mb-4"
                    }`}
                    to={item.number.toString()}
                    state={{ backgroundLocation: location }}
                >
                    <div className={`${styles.header} mb-6`}>
                        <p className="text text_type_digits-default">
                            #{item.number}
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            <FormattedDate date={new Date(item.createdAt)} />
                        </p>
                    </div>
                    <h3 className="text text_type_main-medium">{item.name}</h3>
                    {item.status && (
                        <p className="text text_type_main-default mt-2">
                            {status}
                        </p>
                    )}
                    <div className={`${styles.footer} mt-6`}>
                        <span className={styles.footer__images}>
                            {images
                                .slice(0, 6)
                                .map((el: string | undefined, index: Key) => (
                                    <OrderDetailsImg img={el} key={index} />
                                ))}
                            {images.length > 6 && (
                                <span
                                    className={`${styles.count} ${
                                        isMobile ? styles.count__mobile : ""
                                    } text text_type_main-default`}
                                >
                                    +{images.length - 6}
                                </span>
                            )}
                        </span>
                        <p
                            className={`${styles.price} text text_type_digits-default ml-6`}
                        >
                            <OrderTotalPrice ingredients={item.ingredients} />
                            <CurrencyIcon type="primary" />
                        </p>
                    </div>
                </Link>
            ) : null}
        </>
    );
};

export default memo(OrdersListElement);
