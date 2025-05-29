import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo, useEffect, useState } from "react";
import FeedStats from "../components/feed-stats/feed-stats";
import FeedList from "../components/feed/feed";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../services/store/hooks";
import { _ALL, LIST, NORMA_WEBSOCKET, STATS } from "../utils/vars";
import {
    FEED_WS_CONNECT,
    FEED_WS_DISCONNECT,
} from "../services/feed-orders/actions";
import {
    getFeedOrdersSocketError,
    getFeedOrdersSocketStatus,
} from "../services/feed-orders/selectors";
import { WebSocketStatus } from "../utils/types";
import Loading from "../components/loading/loading";

const OrdersPage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();
    const socketStatus = useAppSelector(getFeedOrdersSocketStatus);
    const socketError = useAppSelector(getFeedOrdersSocketError);

    // активные табы
    const [current, setCurrent] = useState(LIST);

    const onTabClick = (tab: string) => {
        setCurrent(tab);
    };

    useEffect(() => {
        dispatch(FEED_WS_CONNECT(NORMA_WEBSOCKET + _ALL));

        return () => {
            dispatch(FEED_WS_DISCONNECT());
        };
    }, [dispatch]);

    return (
        <>
            {socketStatus === WebSocketStatus.CONNECTING ? (
                <Loading />
            ) : socketError ? (
                <Loading>Ошибка загрузки</Loading>
            ) : (
                <>
                    <h3
                        className={`text text_type_main-large mb-6 ${
                            isMobile ? "align-center" : ""
                        }`}
                    >
                        Лента заказов
                    </h3>

                    {isMobile && (
                        <nav className="custom-tabs">
                            <Tab
                                value={LIST}
                                active={current === LIST}
                                onClick={onTabClick}
                            >
                                Заказы
                            </Tab>
                            <Tab
                                value={STATS}
                                active={current === STATS}
                                onClick={onTabClick}
                            >
                                Статистика
                            </Tab>
                        </nav>
                    )}

                    <section className="two-columns">
                        {/* для десктопа рендерим сразу два столбца без табов */}
                        {/* для мобилок переключение табами между двумя столбцами */}
                        {!isMobile ? (
                            <FeedList />
                        ) : (
                            isMobile && current === LIST && <FeedList />
                        )}
                        {!isMobile ? (
                            <FeedStats />
                        ) : (
                            isMobile && current === STATS && <FeedStats />
                        )}
                    </section>
                </>
            )}
        </>
    );
};

export default memo(OrdersPage);
