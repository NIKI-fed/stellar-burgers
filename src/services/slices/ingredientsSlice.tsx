import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TIngredientsState = {
    ingredients: TIngredient[];
    isLoading: boolean;
    error: string | null | undefined;
};

const initialState: TIngredientsState = {
    ingredients: [],
    isLoading: false,
    error: null
};

export const getBurgerIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    
    extraReducers: (builder) => {
        builder
        .addCase(getBurgerIngredients.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getBurgerIngredients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ingredients = action.payload;
        })
        .addCase(getBurgerIngredients.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    },
    selectors: {
        selectorIngredient: (state) => state.ingredients,
        selectorIngredientIsLoading: (state) => state.isLoading,
        selectorIngredientError: (state) => state.error
    }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const {
            selectorIngredient,
            selectorIngredientIsLoading,
            selectorIngredientError
            } = ingredientsSlice.selectors;