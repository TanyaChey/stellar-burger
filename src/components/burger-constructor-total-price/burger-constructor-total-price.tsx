import { FC, memo, useEffect, useState } from "react";
import { getTotalPrice } from "../../services/burger-constructor/selectors";
import { useAppSelector } from "../../services/store/hooks";

// ===чисто ради эксперимента===
// может подскажете библиотечку для такой анимации? =)
const useAnim = () => {
    const price: number = useAppSelector(getTotalPrice);
    const [animPrice, setAnimPrice] = useState(0);
    useEffect(() => {
        let interval = setInterval(() => {
            const diff = Math.abs(price - animPrice);

            let count = 0;
            if (diff / 1000 > 1) {
                count = 1000;
            } else if (diff / 100 > 1) {
                count = 100;
            } else if (diff / 10 > 1) {
                count = 10;
            } else {
                count = 1;
            }
            if (0 <= animPrice && animPrice < price) {
                setAnimPrice((animPrice) => animPrice + count);
            } else if (0 < animPrice && animPrice > price) {
                setAnimPrice((animPrice) => animPrice - count);
            } else {
                clearInterval(interval);
            }
        }, 10);

        return () => clearInterval(interval);
    }, [animPrice, price]);
    return animPrice;
};
// ===чисто ради эксперимента===

interface IProps {
    extraClass: string;
}

const BurgerConstructorTotalPrice: FC<IProps> = ({ extraClass }) => {
    const animPrice = useAnim();
    return <span className={extraClass}>{animPrice}</span>;
};

export default memo(BurgerConstructorTotalPrice);
