import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectorBurgerConstructor, resetConstructor } from '../../services/slices/burgerConstructorSlice';
// import { postOrder, getOrderNumber, selectorOrders, selectorQuery } from '../../services/slices/createOrderSlice';
// import { selectProfileUser } from '../../services/slices/profileUserSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  
  
  
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };

  const orderRequest = false
  const orderModalData = null;

  // const constructorItems = useSelector(selectorBurgerConstructor);
  // const orderRequest = useSelector(selectorQuery);
  // const orderModalData = useSelector(selectorOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector(selectProfileUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
