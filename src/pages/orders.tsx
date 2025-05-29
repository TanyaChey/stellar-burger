import { FC, memo, useEffect } from "react";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../services/store/hooks";
import { ACCESS_TOKEN, NORMA_WEBSOCKET } from "../utils/vars";
import {
    PROFILE_WS_CONNECT,
    PROFILE_WS_DISCONNECT,
} from "../services/profile-orders/actions";
import {
    getProfileOrdersSocketError,
    getProfileOrdersSocketStatus,
} from "../services/profile-orders/selectors";
import { WebSocketStatus } from "../utils/types";
import Loading from "../components/loading/loading";
import OrdersList from "../components/orders-list/order-list";

const OrdersPage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();
    const socketStatus = useAppSelector(getProfileOrdersSocketStatus);
    const socketError = useAppSelector(getProfileOrdersSocketError);
    const accessToken = localStorage.getItem(ACCESS_TOKEN)?.split(" ")[1];

    useEffect(() => {
        dispatch(PROFILE_WS_CONNECT(NORMA_WEBSOCKET + `?token=${accessToken}`));

        return () => {
            dispatch(PROFILE_WS_DISCONNECT());
        };
    }, [accessToken, dispatch]);

    return (
        <>
            {socketStatus === WebSocketStatus.CONNECTING ? (
                <Loading />
            ) : socketError ? (
                <Loading>Ошибка загрузки</Loading>
            ) : (
                <>
                    {isMobile && (
                        <h3 className="text text_type_main-large mb-6 align-center">
                            История заказов
                        </h3>
                    )}
                    <OrdersList />
                </>
            )}
        </>
    );
};

export default memo(OrdersPage);
