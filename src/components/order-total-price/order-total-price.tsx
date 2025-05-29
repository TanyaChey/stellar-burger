import { FC, memo } from "react";
import { getOrderTotalPrice } from "../../services/ingredients-list/selectors";
import { useAppSelector } from "../../services/store/hooks";

interface IProps {
    ingredients: string[];
}

const OrderTotalPrice: FC<IProps> = ({ ingredients }) => {
    const sum: number = useAppSelector(getOrderTotalPrice(ingredients));
    return <span className="mr-2">{sum}</span>;
};

export default memo(OrderTotalPrice);
