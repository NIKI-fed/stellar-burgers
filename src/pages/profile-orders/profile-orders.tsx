import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getActiveOrder, selectorActiveOrder } from '../../services/slices/activeOrderSlice';

export const ProfileOrders: FC = () => {

  const dispatch = useDispatch();

  /** TODO: взять переменную из стора (ВЫПОЛНЕНО)*/

  const orders: TOrder[] = useSelector(selectorActiveOrder);

  useEffect(() => {
    dispatch(getActiveOrder());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
