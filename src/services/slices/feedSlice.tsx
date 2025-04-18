import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

// Типизируем состояние ленты заказов
type TFeedState = {
    feed: TOrdersData;
    isLoading: boolean;
    error: string | null | undefined;
};

export const initialState: TFeedState = {
    feed: {
        orders: [],
        total: 0,
        totalToday: 0
    },
    isLoading: false,
    error: null,
};

// Функция для получения данных ленты заказов
export const getFeeds = createAsyncThunk('feed/getFeed', async () => {
    const response = await getFeedsApi();
    return response;
});

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFeeds.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getFeeds.fulfilled, (state, action) => {
            state.feed = action.payload;
            state.feed.total = action.payload.total;
            state.feed.totalToday = action.payload.totalToday;
            state.isLoading = false;
        })
        .addCase(getFeeds.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    },
    selectors: {
        selectorFeed: (state: TFeedState) => state.feed,
        selectorFeedOrder: (state: TFeedState) => state.feed.orders,
        selectorFeedIsLoading: (state: TFeedState) => state.isLoading
    }
});

export const feedReducer = feedSlice.reducer;
export const {selectorFeed, selectorFeedOrder, selectorFeedIsLoading} = feedSlice.selectors;