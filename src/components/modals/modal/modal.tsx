import { FC, PropsWithChildren, memo } from "react";
import ReactDOM from "react-dom";
import { getIsMobile } from "../../../services/mobile/selectors";
import { useAppSelector } from "../../../services/store/hooks";
import CloseModal from "../close-modal/close-modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.scss";
import { useParams } from "react-router-dom";

interface IProps extends PropsWithChildren {
    closeModal: () => void;
    title?: string;
}

const Modal: FC<IProps> = (props) => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    // для модалки деталей заказа
    const { id } = useParams();

    return ReactDOM.createPortal(
        <>
            <div className={`${styles.modal} p-10 pb-15`}>
                <div className={styles.header}>
                    <h3
                        className={`${styles.title} ${
                            props.title
                                ? "text text_type_main-large"
                                : "text text_type_digits-default"
                        }`}
                    >
                        {props.title ? props.title : id ? `#${id}` : ""}
                    </h3>
                    <CloseModal closeModal={props.closeModal} />
                </div>
                <div className={styles.content}>{props.children}</div>
            </div>
            {!isMobile && <ModalOverlay closeModal={props.closeModal} />}
        </>,
        document.getElementById("modals") as HTMLElement
    );
};

export default memo(Modal);
