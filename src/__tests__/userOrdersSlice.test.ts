import {
    userOrdersReducer,
    initialState,
    getUserOrders
} from '../services/slices/userOrdersSlice';

describe('Тестирование userOrdersSlice', () => {

    test('getUserOrders pending', () => {
        const testState = {
            orders: [],
            isLoading: true,
            error: null
        };
        const newState = userOrdersReducer(
            { ...initialState },
            getUserOrders.pending('')
        );

        expect(newState.orders).toEqual(testState.orders);
        expect(newState.isLoading).toEqual(true);
        expect(newState.error).toEqual(null);
    });

    test('getUserOrders fulfilled', () => {
        const testOrders = [{
            _id: '1',
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
        }];

        const testState = {
            orders: testOrders,
            isLoading: false,
            error: null
        };

        const newState = userOrdersReducer(
            { ...initialState },
            getUserOrders.fulfilled(testOrders, '')
        );

        expect(newState.orders).toEqual(testState.orders);
        expect(newState.isLoading).toEqual(testState.isLoading);
    });

    test('getUserOrders rejected', () => {
        const testError = new Error('test error message');
        const newState = userOrdersReducer(
            { ...initialState },
            getUserOrders.rejected(testError, '')
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
    });

});