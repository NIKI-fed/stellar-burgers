import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectorBurgerConstructor, resetConstructor } from '../../services/slices/burgerConstructorSlice';
import { postOrder, clearOrders, selectorOrder, selectorOrderIsLoading } from '../../services/slices/createOrderSlice';
import { selectorUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  
    
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора (ВЫПОЛНЕНО)*/

  const constructorItems = useSelector(selectorBurgerConstructor);
  const orderRequest = useSelector(selectorOrderIsLoading);
  const orderModalData = useSelector(selectorOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectorUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(postOrder(
      [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(clearOrders());
  }

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
