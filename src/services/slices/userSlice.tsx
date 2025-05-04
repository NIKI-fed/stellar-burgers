import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { 
        TRegisterData,
        TLoginData,
        registerUserApi,
        loginUserApi,
        forgotPasswordApi,
        resetPasswordApi,
        getUserApi,
        updateUserApi,
        logoutApi
        } from "@api";

//  Типизируем начальное состояние пользователя
type TUserState = {
    user: TUser | null;
    isAuth: boolean,
    isLoading: boolean,
    error: string | null | undefined;
}

// Определяем начальное состояние пользователя
export const initialState: TUserState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
};

// Функции для работы с данными пользователя

// Функция регистрации
export const registerUserThunk = createAsyncThunk(
    'user/register',
    async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
        const data = await registerUserApi({ email, name, password });
        if (data.success) {
            setCookie('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data;
        } else {
            return rejectWithValue('Ошибка регистрации');
        }
    }
);

// Функция авторизации
export const loginUserThunk = createAsyncThunk(
    'user/login',
    async ({ email, password }: TLoginData, { rejectWithValue }) => {
        const data = await loginUserApi({ email, password });
        if (data.success) {
            setCookie('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            console.log('я авторизовался', data)
            return data.user;
        } else {
            return rejectWithValue('Ошибка входа');
        }
    }
);

// Функция logout
export const logoutUserThunk = createAsyncThunk(
    'user/logout',
    async () => {
        await logoutApi();
        deleteCookie('accessToken');
        localStorage.clear();
    }
);

// Функция получения данных пользователя
export const getUserThunk = createAsyncThunk(
    'user/get',
    async () => getUserApi());

// Функция проверки авторизации пользователя
export const checkUserAuthThunk = createAsyncThunk(
    'user/checkUser',
    async (_, { dispatch }) => {
        if (getCookie('accessToken')) {
            console.log('я авторизован')
            await dispatch(getUserThunk());
        } else {
            console.log('кто я?');
            dispatch(actionCheckAuthUser());
        }
    }
);

// Функция обновления данных пользователя
export const updateUserThunk = createAsyncThunk(
    'user/updateUser',
    async ({ email, name, password }: Partial<TRegisterData>, { rejectWithValue }) => {
        try {
            const updateDataUser = await updateUserApi({ email, name, password });
            return updateDataUser;
        } catch (error) {
            return rejectWithValue('Ошибка обновления данных');
        }
    }
)

 // Создаём слайс пользователя
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        actionCheckAuthUser: (state) => {
            state.isAuth = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Обработка получения данных пользователя
            .addCase(getUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.isLoading = false
                state.isAuth = true
            })
            .addCase(getUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = true
                state.error = action.error.message;
            })
            // Обработка проверки авторизации пользователя
            .addCase(checkUserAuthThunk.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(checkUserAuthThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(checkUserAuthThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.isAuth = true;
            })
            // Обработка обновления данных пользователя
            .addCase(updateUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })            
            // Обработка региcтрации пользователя
            .addCase(registerUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;;
            })
            // Обработка авторизации пользователя
            .addCase(loginUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserThunk.fulfilled,(state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(loginUserThunk.rejected, (state) => {
                state.isLoading = false;
            })
            // Обработка выхода пользователя
            .addCase(logoutUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(logoutUserThunk.rejected, (state) => {
                state.isLoading = false;
            });
        },
    selectors: {
        selectorUser: (state) => state.user,
        selectorIsLoading: (state) => state.isLoading,
        selectorAuthUser: (state) => state.isAuth,
        selectorUserName: (state) => state.user?.name
    }
})

export const { actionCheckAuthUser } = userSlice.actions;
export const {  
                selectorUser,
                selectorIsLoading,
                selectorAuthUser,
                selectorUserName } = userSlice.selectors;

export const userReducer = userSlice.reducer;