import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';

type TCreateOrdersState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null | undefined;
};
export const initialState: TCreateOrdersState = {
  order: null,
  isLoading: false,
  error: null 
};

// Отправить заказ на сервер
export const postOrder = createAsyncThunk('order/postOrder', orderBurgerApi);

// Получить номер заказа
export const getOrderNumber = createAsyncThunk('order/retrieveById', getOrderByNumberApi);

export const createOrderSlice = createSlice({
  name: 'createOrders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getOrderNumber.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectorOrder: (state) => state.order,
    selectorOrderIsLoading: (state) => state.isLoading
  }
});

export const createOrderReducer = createOrderSlice.reducer;

export const {
  selectorOrder,
  selectorOrderIsLoading
} = createOrderSlice.selectors;

export const { clearOrders } = createOrderSlice.actions;