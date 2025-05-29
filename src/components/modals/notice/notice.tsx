import { FC, memo } from "react";
import ReactDOM from "react-dom";
import styles from "./notice.module.scss";

interface IProps {
    text: string;
    type?: "error";
}

const Notice: FC<IProps> = (props) => {
    return ReactDOM.createPortal(
        <div
            className={`${styles.notice} ${
                props.type === "error" ? styles.error : ""
            }`}
        >
            <p className="text text_type_main-default">{props.text}</p>
        </div>,
        document.getElementById("notices") as HTMLElement
    );
};

export default memo(Notice);
