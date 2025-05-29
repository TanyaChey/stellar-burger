import { FC, memo, useEffect } from "react";
import styles from "./modal-overlay.module.scss";

interface IProps {
    closeModal: () => void;
}

const ModalOverlay: FC<IProps> = ({ closeModal }) => {
    useEffect(() => {
        const onKeypress = (e: KeyboardEvent) => {
            if (e.key === "Escape" && closeModal) {
                closeModal();
            }
        };

        document.addEventListener("keydown", onKeypress);

        return () => {
            document.removeEventListener("keydown", onKeypress);
        };
    });

    return <div className={styles.overlay} onClick={closeModal}></div>;
};

export default memo(ModalOverlay);
