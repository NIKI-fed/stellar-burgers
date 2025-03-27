import '../../index.css';
import styles from './app.module.css';
import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
//import { ProtectedRoute } from '../protected-route/protected-route';
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
import { 
        AppHeader,
        Modal,
        OrderInfo,
        IngredientDetails
      } from '@components';

const App = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundPosition = location.state?.backgroundLocation;

  const renderModalRoute = (
    path: string,
    title: string,
    onClose: () => void,
    children: JSX.Element
  ) => {
    return (
      <Route path={path} element={<Modal title={title} onClose={onClose}>{children}</Modal>}> </Route>
    )
  }

  return (
    <div className={styles.app}>
    <AppHeader/>

    <Routes location={backgroundPosition || location}>

        <Route path='/' element={<ConstructorPage/>} />
        <Route path='/feed' element={<Feed/>} />
        <Route path='/login' element={
          //<ProtectedRoute>
            <Login/>
          //</ProtectedRoute>
          }
        />
        <Route path='/register' element={
          //<ProtectedRoute>
            <Register/>
          //</ProtectedRoute>
          }
        />

        <Route path='/forgot-password' element={
          //<ProtectedRoute>
            <ForgotPassword/>
          //</ProtectedRoute>
          }
        />

        <Route path='/reset-password' element={
          //<ProtectedRoute>
            <ResetPassword/>
          //</ProtectedRoute>
          }
        />

        <Route path='/profile' element={
          //<ProtectedRoute>
            <Profile/>
          //</ProtectedRoute>
          }
        />

        <Route path='/profile/orders' element={
          //<ProtectedRoute>
            <ProfileOrders/>
          //</ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />

        {renderModalRoute(
          '/feed/:number',
          'Детали заказа',
          () => navigate('/feed'),
          <OrderInfo/>
        )}
        
        {renderModalRoute(
          '/ingredients/:id',
          'Ингредиенты',
          () => navigate('/'),
          <IngredientDetails/>
        )}

        {renderModalRoute(
          '/profile/orders/:number',
          'Детали заказа защ.',
          () => navigate('/profile/orders/'),
          <OrderInfo/>
        )}
      
    </Routes>

    {backgroundPosition && (
      <Routes>
      {renderModalRoute(
            '/feed/:number',
            'Детали заказа',
            () => navigate('/feed'),
            <OrderInfo/>
          )}
          
          {renderModalRoute(
            '/ingredients/:id',
            'Ингредиенты',
            () => navigate('/'),
            <IngredientDetails/>
          )}

          {renderModalRoute(
            '/profile/orders/:number',
            'Детали заказа защ.',
            () => navigate('/profile/orders/'),
            <OrderInfo/>
          )}
      </Routes>
    )}
    </div>
  )
};

export default App;
