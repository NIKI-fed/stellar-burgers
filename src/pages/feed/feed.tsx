import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store'; 
import { getFeeds, selectorFeedOrder } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора (ВЫПОЛНЕНО)*/
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectorFeedOrder);

  useEffect(() => {
    dispatch(getFeeds())
  }, [])

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds())
      }} 
    />
  )
};
