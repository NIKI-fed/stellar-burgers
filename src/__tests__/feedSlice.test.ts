import {
    feedReducer,
    initialState,
    getFeeds
} from '../services/slices/feedSlice';

describe('Тестирование feedSlice', () => {

    test('getFeeds pending', () => {
        const newState = feedReducer( { ...initialState }, getFeeds.pending(''));
        
        expect(newState.isLoading).toEqual(true);
        expect(newState.error).toEqual(null);
    });

    test('getFeeds fulfilled', () => {
        const testFeed = {
            orders: [
                        {
                        _id: '68166d58e8e61d001cec5d65',
                        status: 'done',
                        name: 'БургерТест',
                        createdAt: "2025-05-03T19:24:08.524Z",
                        updatedAt: "2025-05-03T19:24:09.265Z",
                        number: 76154,
                        ingredients: [
                                    '643d69a5c3f7b9001cfa0940',
                                    '643d69a5c3f7b9001cfa0942',
                                    '643d69a5c3f7b9001cfa0944'
                                    ]
                        }
                    ],
            total: 100,
            totalToday: 10
        };

        const testState = {
            feed: testFeed,
            isLoading: false,
            error: null
        };
        const newState = feedReducer(
            { ...initialState },
            getFeeds.fulfilled(testFeed, '')
        );

        expect(newState.feed).toEqual(testState.feed);
        expect(newState.feed.total).toEqual(testState.feed.total);
        expect(newState.feed.totalToday).toEqual(testState.feed.totalToday);
        expect(newState.isLoading).toEqual(testState.isLoading);
    });

    test('getFeeds rejected', () => {
        const testError = new Error('Error message');
        const newState = feedReducer(
            { ...initialState },
            getFeeds.rejected(testError, '')
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
    });

});