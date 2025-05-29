import { FC, memo } from "react";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import OrdersListElement from "../orders-list-element/orders-list-element";
import styles from "./feed.module.scss";
import { getFeedOrdersList } from "../../services/feed-orders/selectors";

const FeedList: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const ordersList = useAppSelector(getFeedOrdersList);

    return (
        <section className={`${styles.section} custom-scroll`}>
            <div
                className={`${styles.inner} ${
                    !isMobile ? "pr-4" : "pt-5"
                } pb-4`}
            >
                {ordersList.length > 0 ? (
                    ordersList.map((item) => (
                        <OrdersListElement item={item} key={item._id} />
                    ))
                ) : (
                    <h2>Заказов пока что нет</h2>
                )}
            </div>
        </section>
    );
};

export default memo(FeedList);
