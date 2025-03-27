// import { useSelector} from '../../services/store';
// import { userSelector } from 'src/services/slices/userSlice';
// import { Navigate, useLocation } from 'react-router';
// import { Preloader } from '../ui/preloader';

// type ProtectedRouteProps = {
//     onlyUnAuth?: boolean;
//     children: React.ReactElement;
// };

// export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {

//     //console.log(userSelector);
//     const location = useLocation();
//     const { user, isAuthChecked} = useSelector(userSelector)

//     // const  = useSelector(.selectUserCheck); // селектор получения состояния загрузки пользователя
//     // const user = useSelector(userSelector.getUserName); // селектор получения пользователя из store
    

//     if (!isAuthChecked) { // пока идёт чекаут пользователя, показываем прелоадер
//         return <Preloader />;
//     }

//     if (!onlyUnAuth && !user) { // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
//         return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
//     }

//     if (onlyUnAuth && user) { // если пользователь на странице авторизации и данные есть в хранилище
//         // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
//             // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
//             // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
//             const from  = location.state?.from?.pathname || '/profile';
//             return <Navigate replace to={from} />;
//     }

//     return children ;
// }