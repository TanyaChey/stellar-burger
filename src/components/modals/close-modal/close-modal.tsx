import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo } from "react";
import styles from "./close-modal.module.scss";

interface IProps {
    closeModal: () => void;
}

const CloseModal: FC<IProps> = ({ closeModal }) => {
    return (
        <span
            className={`${styles.modal__close} remove-select`}
            onClick={closeModal}
            data-test="close-modal"
        >
            <CloseIcon type="primary" />
        </span>
    );
};

export default memo(CloseModal);
