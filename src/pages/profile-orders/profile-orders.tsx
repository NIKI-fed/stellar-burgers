import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrders, selectorUserOrders, selectorUserOrdersIsLoading } from '../../services/slices/userOrdersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {

  /** TODO: взять переменную из стора (ВЫПОЛНЕНО)*/

  const orders: TOrder[] = useSelector(selectorUserOrders);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectorUserOrdersIsLoading); 

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <>
      { isLoading
        ? <Preloader />
        : <ProfileOrdersUI orders={orders} />
      }
    </>
  )
};