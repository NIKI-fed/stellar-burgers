import {
    createOrderReducer,
    initialState,
    getOrderNumber,
    postOrder
} from '../services/slices/createOrderSlice';

const orderData = {
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
}

describe('Тестирование createOrderSlice', function () {
    
    test('postOrder pending', () => {
        const newState = createOrderReducer(
            { ...initialState },
            postOrder.pending('', [])
        );
        expect(newState.isLoading).toEqual(true);
    });

    test('postOrder fulfilled', () => {

        const testOrder = {
            order: orderData,
            name: 'orderTest',
            isLoading: false,
            error: null 
        };

        const testState = {
            order: testOrder.order,
            isLoading: false,
            error: null
        };

        const newState = createOrderReducer(
            { ...initialState },
            postOrder.fulfilled(testOrder, '', ['1'])
        );
        expect(newState.order).toEqual(testState.order);
        expect(newState.isLoading).toEqual(false);
    });

    test('postOrder rejected', () => {
        const testError = new Error('Error message');
        const newState = createOrderReducer(
            { ...initialState },
            postOrder.rejected(testError, '', [])
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
    });

    test('getOrderNumber pending', () => {
        const newState = createOrderReducer(
            { ...initialState },
            getOrderNumber.pending('', 0)
        );
        expect(newState.isLoading).toEqual(true);
    });

    test('getOrderNumber fulfille', () => {
        const testOrder = {
            orders: [orderData],
            name: 'orderTest',
            isLoading: false,
            error: null 
        };

        const newState = createOrderReducer(
            { ...initialState },
            getOrderNumber.fulfilled(testOrder, '', 1)
        );
        expect(newState.order).toEqual(testOrder.orders[0]);
        expect(newState.isLoading).toEqual(false);
    });

    test('getOrderNumber rejected', () => {
        const testError = new Error('Error message');
        const newState = createOrderReducer(
            { ...initialState },
            getOrderNumber.rejected(testError, '', 0)
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
    });

});