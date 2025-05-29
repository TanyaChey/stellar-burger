import { FC, memo } from "react";
import styles from "./burger-btn.module.css";

interface IProps {
    isMenuOpen: boolean;
    click: Function;
}

const BurgerBtn: FC<IProps> = ({ isMenuOpen, click }) => {
    return (
        <div
            className={`${styles.burger} ${
                isMenuOpen && styles.active
            } mr-3 remove-select`}
            onClick={() => click()}
        >
            <div className={styles.burger__btn}></div>
        </div>
    );
};

export default memo(BurgerBtn);
