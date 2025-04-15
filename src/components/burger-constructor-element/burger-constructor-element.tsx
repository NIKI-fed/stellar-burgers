import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
        moveUpIngredientInConstructor,
        moveDownIngredientInConstructor,
        removeIngredientFromConstructor
      } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {

    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveDownIngredientInConstructor(ingredient));
    };

    const handleMoveUp = () => {
      dispatch(moveUpIngredientInConstructor(ingredient));
    };

    const handleClose = () => {
      dispatch(removeIngredientFromConstructor(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
