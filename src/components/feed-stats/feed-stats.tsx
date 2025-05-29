import { FC, memo, useMemo } from "react";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import styles from "./feed-stats.module.scss";
import {
    getFeedOrdersList,
    getFeedOrdersTotal,
    getFeedOrdersTotalToday,
} from "../../services/feed-orders/selectors";
import { OrderStatus, TFeedOrder } from "../../utils/types";

const FeedStats: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const orders: TFeedOrder[] = useAppSelector(getFeedOrdersList);
    const total = useAppSelector(getFeedOrdersTotal);
    const totalToday = useAppSelector(getFeedOrdersTotalToday);

    const ordersDone = useMemo(
        () => orders.filter((item) => item.status === OrderStatus.DONE),
        [orders]
    );

    const ordersInWork = useMemo(
        () => orders.filter((item) => item.status !== OrderStatus.DONE),
        [orders]
    );

    return (
        <section className={`${styles.section} custom-scroll`}>
            <div className={`${styles.inner} ${isMobile ? "pt-5" : ""}`}>
                <div className={`${styles.status} mb-15`}>
                    <span className={`${styles.status__column} mr-9`}>
                        <h4 className="text text_type_main-medium mb-6">
                            Готовы:
                        </h4>
                        <span className={styles.order_list}>
                            <span className={styles.order_list__column}>
                                {ordersDone
                                    .slice(0, 5)
                                    .map((el: TFeedOrder) => (
                                        <p
                                            className="text text_type_digits-default mb-2"
                                            key={el._id}
                                        >
                                            {el.number}
                                        </p>
                                    ))}
                            </span>
                            <span className={styles.order_list__column}>
                                {ordersDone
                                    .slice(5, 10)
                                    .map((el: TFeedOrder) => (
                                        <p
                                            className="text text_type_digits-default mb-2"
                                            key={el._id}
                                        >
                                            {el.number}
                                        </p>
                                    ))}
                            </span>
                            <span className={styles.order_list__column}>
                                {ordersDone
                                    .slice(10, 15)
                                    .map((el: TFeedOrder) => (
                                        <p
                                            className="text text_type_digits-default mb-2"
                                            key={el._id}
                                        >
                                            {el.number}
                                        </p>
                                    ))}
                            </span>
                        </span>
                    </span>
                    <span
                        className={`${styles.status__column} ${
                            !isMobile ? "mr-9" : ""
                        }`}
                    >
                        <h4 className="text text_type_main-medium mb-6">
                            В работе:
                        </h4>
                        <span className={styles.order_list}>
                            <span className={styles.order_list__column}>
                                {ordersInWork
                                    .slice(0, 5)
                                    .map((el: TFeedOrder) => (
                                        <p
                                            className="text text_type_digits-default mb-2"
                                            key={el._id}
                                        >
                                            {el.number}
                                        </p>
                                    ))}
                            </span>
                            <span className={styles.order_list__column}>
                                {ordersInWork
                                    .slice(5, 10)
                                    .map((el: TFeedOrder) => (
                                        <p
                                            className="text text_type_digits-default mb-2"
                                            key={el._id}
                                        >
                                            {el.number}
                                        </p>
                                    ))}
                            </span>
                            <span className={styles.order_list__column}>
                                {ordersInWork
                                    .slice(10, 15)
                                    .map((el: TFeedOrder) => (
                                        <p
                                            className="text text_type_digits-default mb-2"
                                            key={el._id}
                                        >
                                            {el.number}
                                        </p>
                                    ))}
                            </span>
                        </span>
                    </span>
                </div>
                <div className="mb-15">
                    <h4 className="text text_type_main-medium">
                        Выполнено за все время:
                    </h4>
                    <p className="text text_type_digits-large">{total}</p>
                </div>
                <div>
                    <h4 className="text text_type_main-medium">
                        Выполнено за сегодня:
                    </h4>
                    <p className="text text_type_digits-large mb-6">
                        {totalToday}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default memo(FeedStats);
