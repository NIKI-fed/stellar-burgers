import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader';
import { useSelector} from '../../services/store';
import { selectorUser, selectorAuthUser } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
    publicRoute?: boolean;
    children: React.ReactElement;
};

export const ProtectedRoute = ({ publicRoute, children }: ProtectedRouteProps) => {

    const location = useLocation();
    const isAuthChecked = useSelector(selectorAuthUser);
    const user = useSelector(selectorUser);

    if (!isAuthChecked) { // пока идёт чекаут пользователя, показываем прелоадер
        return <Preloader />;
    }

    if (!publicRoute && !user) {
        return <Navigate replace to='/login' state={{ from: location }} />;
    }

    if (publicRoute && user) {
            const from  = location.state?.from.pathname || '/profile';
            return <Navigate replace to={from} />;
    }

    return children ;
}