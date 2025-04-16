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

export const getActiveOrder = createAsyncThunk(
    'ActiveOrders/get',
    async () => getOrdersApi()
);

export const activeOrderSlice = createSlice({
    name: 'activeOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getActiveOrder.pending, (state) => {
                state.orders = [];
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getActiveOrder.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.isLoading = false;
            })
            .addCase(getActiveOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
    selectors: {
        selectorActiveOrder: (state) => state.orders,
        selectorActiveOrderIsLoading: (state) => state.isLoading
    }
});

export const activeOrderReducer = activeOrderSlice.reducer;

export const {
    selectorActiveOrder,
    selectorActiveOrderIsLoading
} = activeOrderSlice.selectors;