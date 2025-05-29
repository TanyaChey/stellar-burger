import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo, useEffect, useState } from "react";
import vector1 from "../../images/order-accepted/vector1.svg";
import vector2 from "../../images/order-accepted/vector2.svg";
import vector3 from "../../images/order-accepted/vector3.svg";
import { getConstructorOrderNumber } from "../../services/constructor-order-details/selectors";
import { useAppSelector } from "../../services/store/hooks";
import styles from "./constructor-order-details.module.scss";

// ===чисто ради эксперимента===
// может подскажете библиотечку для такой анимации? =)
const useAnim = () => {
    const orderNumber: number = useAppSelector(getConstructorOrderNumber);
    const [animNumber, setAnimNumber] = useState(0);
    useEffect(() => {
        let interval = setInterval(() => {
            const diff = Math.abs(orderNumber - animNumber);
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
            if (0 <= animNumber && animNumber < orderNumber) {
                setAnimNumber((animNumber) => animNumber + count);
            } else {
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [animNumber, orderNumber]);
    return animNumber;
};
// ===чисто ради эксперимента===

const ConstructorOrderDetails: FC = () => {
    const animNumber = useAnim();
    return (
        <div className={`${styles.modal} p-10`}>
            <>
                <p
                    className={`${styles.order__num} text text_type_digits-large mb-8`}
                >
                    {animNumber}
                </p>
                <p className="text text_type_main-medium mb-15">
                    идентификатор заказа
                </p>
                <div className={`${styles.done} mb-15 ml-auto mr-auto`}>
                    <img src={vector1} alt="" className={styles.done__round} />
                    <img src={vector2} alt="" className={styles.done__round} />
                    <img src={vector3} alt="" className={styles.done__round} />
                    <CheckMarkIcon type="primary" />
                </div>
                <p className="text text_type_main-default mb-2">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </>
        </div>
    );
};

export default memo(ConstructorOrderDetails);
