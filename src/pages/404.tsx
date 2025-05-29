import { FC, memo } from "react";
import img404 from "../images/error-404.svg";

const ErrorNotFoundPage: FC = () => {
    return (
        <div className="container">
            <img className="img404" src={img404} alt="page not found" />
        </div>
    );
};

export default memo(ErrorNotFoundPage);
