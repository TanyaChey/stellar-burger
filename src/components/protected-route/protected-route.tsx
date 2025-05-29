import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getIsAuthChecked, getUser } from "../../services/auth/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { _LOGIN_PATH } from "../../utils/vars";
import Loading from "../loading/loading";

interface IProps {
    onlyAuth?: boolean;
    component: ReactElement;
}

const ProtectedRoute: FC<IProps> = ({ onlyAuth = true, component }) => {
    const isAuthChecked = useAppSelector(getIsAuthChecked);
    const user = useAppSelector(getUser);
    const location = useLocation();

    if (!isAuthChecked) {
        // запрос в процессе
        return <Loading />;
    }

    if (user && !onlyAuth) {
        // пользователь авторизован, но роут для неавторизованных пользователей
        // редирект на главную или на location.state.from
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!user && onlyAuth) {
        // пользователь неавторизован, но роут для авторизованных пользователей
        return <Navigate to={_LOGIN_PATH} state={{ from: location }} />;
    }

    // авторизация пользователя и доступ к роуту совпадают`
    return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => (
    <ProtectedRoute onlyAuth={false} component={component} />
);
