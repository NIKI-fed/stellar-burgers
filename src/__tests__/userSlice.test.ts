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

    test('registerUserThunk pending', () => {
        const newState = userReducer(
            { ...initialState },
            registerUserThunk.pending('', { email: '', name: '', password: '' })
        );

        expect(newState.isLoading).toEqual(true);
    });

    test('registerUserThunk fulfilled', () => {
        const testUser = {
            success: true,
            accessToken: 'testToken',
            refreshToken: 'testRefreshToken',
            user: {
                email: 'user@test.ru',
                name: 'testUser'
            }
        };

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


});