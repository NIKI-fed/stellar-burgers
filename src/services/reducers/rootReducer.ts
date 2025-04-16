import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { activeOrderReducer } from '../slices/activeOrderSlice';
import { createOrderReducer } from '../slices/createOrderSlice';

export const rootReducer = combineReducers ({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    feed: feedReducer,
    activeOrder: activeOrderReducer,
    createOrders: createOrderReducer
})

