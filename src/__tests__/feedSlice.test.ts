import {
    feedReducer,
    initialState,
    getFeeds
} from '../services/slices/feedSlice';

describe('Тестирование feedSlice', function () {

    test('getFeeds pending', function () {
        const newState = feedReducer( { ...initialState }, getFeeds.pending(''));
        
        expect(newState.isLoading).toEqual(true);
        expect(newState.error).toEqual(null);
    });

    test('getFeeds fulfilled', function () {
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
            total: 1,
            totalToday: 1
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
        expect(newState.isLoading).toEqual(testState.isLoading);
        expect(newState.error).toEqual(testState.error);
    });

    test('getFeeds rejected', function () {
        const testError = new Error('Error message');
        const newState = feedReducer(
            { ...initialState },
            getFeeds.rejected(testError, '')
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
    });

});