import '../../index.css';
import styles from './app.module.css';
import React, { useEffect }  from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getBurgerIngredients } from '../../services/slices/ingredientsSlice';
import { checkUserAuthThunk, selectorAuthUser } from '../../services/slices/userSlice';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import {
        ConstructorPage,
        Feed,
        Login,
        Register,
        ForgotPassword,
        ResetPassword,
        Profile,
        ProfileOrders,
        NotFound404
      } from '@pages';

const App = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  // Подгружаем данные для начальной отрисовки
  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUserAuthThunk());
    // console.log(getBurgerIngredients, 'dsffsd')
  }, [dispatch]);

  const isAuthChecked = useSelector(selectorAuthUser);
  // console.log('ghj',isAuthChecked, checkUserAuthThunk())

  // Функция закрытия модального окна
  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
    <AppHeader/>

    <Routes location={background || location}>

        <Route path='/' element={ <ConstructorPage/> } />
        <Route path='/feed' element={ <Feed/> } />
        <Route path='*' element={ <NotFound404 />} />

        {/* Защищённые роуты */}
        <Route path='/login' element={
          <ProtectedRoute publicRoute>
            <Login/>
          </ProtectedRoute>} />

        <Route path='/register' element={
          <ProtectedRoute publicRoute>
            <Register/>
          </ProtectedRoute>} />

        <Route path='/forgot-password' element={
          <ProtectedRoute publicRoute>
            <ForgotPassword/>
          </ProtectedRoute>} />

        <Route path='/reset-password' element={
          <ProtectedRoute publicRoute>
            <ResetPassword/>
          </ProtectedRoute>} />

        <Route path='/profile' element={
          <ProtectedRoute publicRoute>
            <Profile/>
          </ProtectedRoute>} />

        <Route path='/profile/orders' element={
          <ProtectedRoute publicRoute>
            <ProfileOrders/>
          </ProtectedRoute>} />
        
    </Routes>

    {background && (
      <Routes>

        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={closeModal}>
                <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Ингредиенты' onClose={closeModal}>
                <IngredientDetails/>
            </Modal>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute publicRoute>
              <Modal title='История заказов' onClose={closeModal}>
                  <OrderInfo/>
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
    )}
    </div>
  )
};

export default App;
