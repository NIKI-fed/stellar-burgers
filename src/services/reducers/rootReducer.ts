import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { feedReducer } from '../slices/feedSlice';

export const rootReducer = combineReducers ({
    ingredients: ingredientsReducer,
    constructor: burgerConstructorReducer,
    feed: feedReducer
})

