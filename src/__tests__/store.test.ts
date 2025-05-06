import { rootReducer } from '../services/reducers/rootReducer';
import { store } from '../services/store';

describe('Тестирование rootReducer', () => {

    test('init state', () => {
        const testState = rootReducer(undefined, {type: '@@INIT'});
        const newState = store.getState();

        expect(testState).toEqual(newState)
    });

    test('unknow action', () => {
        const unknownAction = { type: 'UNKNOWN_ACTION' };
        const testState = rootReducer(undefined, unknownAction);
        const newState = store.getState();
    
        expect(testState).toEqual(newState);
    });

});

