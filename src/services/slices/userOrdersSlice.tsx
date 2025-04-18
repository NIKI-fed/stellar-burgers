import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type TActivOrderState = {
    orders: TOrder[];
    isLoading: boolean;
    error: string | null | undefined;
};

export const initialState: TActivOrderState = {
    orders: [],
    isLoading: false,
    error: null
};

export const getUserOrders = createAsyncThunk(
    'ActiveOrders/get',
    async () => getOrdersApi()
);

export const userOrdersSlice = createSlice({
    name: 'userOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserOrders.pending, (state) => {
                state.orders = [];
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.isLoading = false;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
    selectors: {
        selectorUserOrders: (state) => state.orders,
        selectorUserOrdersIsLoading: (state) => state.isLoading
    }
});

export const userOrdersReducer = userOrdersSlice.reducer;

export const {
    selectorUserOrders,
    selectorUserOrdersIsLoading
} = userOrdersSlice.selectors;