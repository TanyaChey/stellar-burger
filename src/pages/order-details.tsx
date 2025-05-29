import { FC, memo } from "react";
import OrderDetails from "../components/order-details/order-details";

interface IProps {
    modal?: boolean;
}

const OrderDetailsPage: FC<IProps> = ({ modal }) => {
    return <OrderDetails modal={modal} />;
};

export default memo(OrderDetailsPage);
