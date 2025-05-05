import {
    userReducer,
    initialState,
    registerUserThunk,
    loginUserThunk,
    logoutUserThunk,
    getUserThunk,
    checkUserAuthThunk,
    updateUserThunk
} from '../services/slices/userSlice';

const testUser = {
    success: true,
    accessToken: 'testToken',
    refreshToken: 'testRefreshToken',
    user: {
        email: 'user@test.ru',
        name: 'testUser'
    }
};

describe('Тестирование userSlice', () => {

    test('getUserThunk pending', () => {
        const newState = userReducer(
            { ...initialState },
            getUserThunk.pending('')
        );

        expect(newState.isLoading).toEqual(true);
    });

    test('getUserThunk fulfilled', () => {
        const newState = userReducer(
            { ...initialState },
            getUserThunk.fulfilled(testUser, '')
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.isAuth).toEqual(true);
        expect(newState.error).toEqual(null);
    });

    test('getUserThunk rejected', () => {
        const testError = new Error('test error message');
        const newState = userReducer(
            { ...initialState },
            getUserThunk.rejected(testError, '')
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.isAuth).toEqual(true);
        expect(newState.error).toEqual(testError.message);
    });

//--------------------------------------

    test('checkUserAuthThunk pending', () => {
        const newState = userReducer(
            { ...initialState },
            checkUserAuthThunk.pending('')
        );
        expect(newState.isLoading).toEqual(true);
        expect(newState.isAuth).toEqual(false);
    });

    test('checkUserAuthThunk fulfilled', () => {
        const newState = userReducer(
            { ...initialState },
            checkUserAuthThunk.fulfilled(undefined, '')
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.isAuth).toEqual(true);
    });

    test('checkUserAuthThunk rejected', () => {
        const testError = new Error('test error message');
        const newState = userReducer(
            { ...initialState },
            checkUserAuthThunk.rejected(testError, '')
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
        expect(newState.isAuth).toEqual(true);
    });

//--------------------------------------

    test('updateUserThunk pending', () => {
        const newState = userReducer(
            { ...initialState },
            updateUserThunk.pending('', { email: '', name: '', password: '' })
        );

        expect(newState.isLoading).toEqual(true);
    });

    test('updateUserThunk fulfilled', () => {
        const testState = {
            user: testUser.user,
            isAuth: true,
            isLoading: false,
            error: null
        };
        const newState = userReducer(
            { ...initialState },
            updateUserThunk.fulfilled(testUser, '', { email: 'test@mail.ru', name: 'TestUser', password: 'testPassword' })
        );

        expect(newState.user).toEqual(testState.user);
        expect(newState.isLoading).toEqual(false);
    });

    test('updateUserThunk rejected', () => {
        const testError = new Error('test error message');
        const newState = userReducer(
            { ...initialState },
            updateUserThunk.rejected(testError, '', { email: '', name: '', password: '' })
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
    });

//--------------------------------------

    test('registerUserThunk pending', () => {
        const newState = userReducer(
            { ...initialState },
            registerUserThunk.pending('', { email: '', name: '', password: '' })
        );

        expect(newState.isLoading).toEqual(true);
    });

    test('registerUserThunk fulfilled', () => {
        const testState = {
            user: testUser.user,
            isAuth: true,
            isLoading: false,
            error: null
        };
        const newState = userReducer(
            { ...initialState },
            registerUserThunk.fulfilled(testUser, '', { email: 'user@test.ru', name: 'testUser', password: 'testPassword' })
        );

        expect(newState.user).toEqual(testState.user);
        expect(newState.isLoading).toEqual(false);
        expect(newState.isAuth).toEqual(true);
    });

    test('registerUserThunk rejected', () => {
        const testError = new Error('test error message');
        const newState = userReducer(
            { ...initialState },
            registerUserThunk.rejected(testError, '', { email: '', name: '', password: ''})
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
    });

//--------------------------------------

    test('loginUserThunk pending', () => {
        const newState = userReducer(
            { ...initialState },
            loginUserThunk.pending('', { email: '', password: '' })
        );

        expect(newState.isLoading).toEqual(true);
    });

    test('loginUserThunk fulfilled', () => {
        const testState = {
            user: testUser.user,
            isAuth: true,
            isLoading: false,
            error: null
        };
        const newState = userReducer(
            { ...initialState },
            loginUserThunk.fulfilled(testUser.user, '', { email: 'test@mail.ru', password: 'testPassword' })
        );

        expect(newState.user).toEqual(testState.user);
        expect(newState.isLoading).toEqual(false);
        expect(newState.isAuth).toEqual(true);
    });

    test('loginUserThunk rejected', () => {
        const testError = new Error('test error message');
        const newState = userReducer(
            { ...initialState },
            loginUserThunk.rejected(testError, '', { email: '', password: '' })
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
    });

//--------------------------------------

    test('logoutUserThunk pending', () => {
        const newState = userReducer(
            { ...initialState },
            logoutUserThunk.pending('')
        );

        expect(newState.isLoading).toEqual(true);
    });
    
    test('logoutUserThunk rejected', () => {
        const testError = new Error('test error message');
        const newState = userReducer(
            { ...initialState },
            logoutUserThunk.rejected(testError, '')
        );

        expect(newState.isLoading).toEqual(false);
    });
    
    test('logoutUserThunk fulfilled', () => {
        const newState = userReducer(
            { ...initialState },
            logoutUserThunk.fulfilled(undefined, '')
        );

        expect(newState.user).toEqual(null);
        expect(newState.isLoading).toEqual(false);
        expect(newState.isAuth).toEqual(false);
    });

});