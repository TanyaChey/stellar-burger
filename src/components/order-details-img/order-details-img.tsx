import { FC, memo } from "react";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import styles from "./order-details-img.module.scss";

interface IProps {
    img: string | undefined;
}

const OrderDetailsImg: FC<IProps> = ({ img }) => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    return (
        <img
            src={img}
            alt=""
            className={`${styles.img} ${isMobile ? styles.img__mobile : ""}`}
        />
    );
};

export default memo(OrderDetailsImg);
