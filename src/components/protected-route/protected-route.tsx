import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader';
import { useSelector} from '../../services/store';
import { selectorUser, selectorAuthUser, actionCheckAuthUser } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
    publicRoute?: boolean;
    children: React.ReactElement;
};

export const ProtectedRoute = ({ publicRoute, children }: ProtectedRouteProps) => {

    const location = useLocation();
    const isLoading = useSelector(selectorAuthUser);
    const user = useSelector(selectorUser);

    if (!isLoading) {
        return <Preloader />;
    }

    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    if (!publicRoute && !user) {
        console.log(location.pathname)
        return <Navigate replace to='/login' state={{ from: location.pathname }}/>;
    }

    // если пользователь на странице авторизации и данные есть в хранилище
    if (publicRoute && user) {
        return <Navigate replace to={ location.state?.from || '/' } />;
    }

    return children ;
}