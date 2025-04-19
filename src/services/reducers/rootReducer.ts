import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { userOrdersReducer } from '../slices/userOrdersSlice';
import { createOrderReducer } from '../slices/createOrderSlice';
import { userReducer } from '../slices/userSlice';

export const rootReducer = combineReducers ({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    feed: feedReducer,
    userOrders: userOrdersReducer,
    createOrders: createOrderReducer,
    user: userReducer
})

