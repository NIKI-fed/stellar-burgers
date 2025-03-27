import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
// import { 
//         getUserApi,
//         loginUserApi,
//         logoutApi,
//         updateUserApi,
//         registerUserApi,
//         TLoginData
//         } from "@api";

//  Типизируем начальное состояние пользователя
type TUserState = {
    user: TUser | null;
    isAuthChecked: boolean,
    isLoading: boolean,
    error: string | null;
}

// Определяем начальное состояние пользователя
const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
    error: null,
};

// Создаём асинхронные функции для работы с данными пользователя
// export const getUserThunk = createAsyncThunk('user/getUser', () => getUserApi());

// export const loginUserThunk = createAsyncThunk(
//     'user/loginUser',
//     ({email, password}: TLoginData) =>
//         data = loginUserApi({email, password});
//         if (!data?.success)
//             .then(token => {
//                 localStorage.setItem('token', token);
//                 return token;
//             }),
// )

// export const loginUserThun = createAsyncThunk(
//     'users/loginUser',
//     ({login, password}: TLoginData) =>
//         loginUserApi({login, password})
//             .then(token => {
//                 localStorage.setItem('token', token);
//                 return token;
//             }),
// )


// Создаём слайс пользователя
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authChecked: (state) => {
            state.isAuthChecked = true;
        },
    },
    selectors: {
        selectUser: (state) => state.user,
        selectUserCheck: (state) => state.isAuthChecked,
        getUserName: (state) => state.user?.name
    }
    // extraReducers: (builder) => {
    //     builder
    //         addCase(getUserThunk.pending, (state) => {
    //             state.isLoading = true;
    //         });
    //         builder.addCase(loginUserThunk.rejected, (state) => {
    //             state.isLoading = false;
    //         });
    //         builder.addCase(loginUserThunk.fulfilled, (state) => {
    //             state.isLoading = false;
    //         });

    //         builder.addCase(getUserThunk.pending, (state) => {
    //             state.isLoading = true;
    //         });
    //         builder.addCase(getUserThunk.rejected, (state) => {
    //             state.isInit = true;
    //             state.isLoading = false;
    //         });
    //         builder.addCase(getUserThunk.fulfilled, (state, {payload}) => {
    //             state.isInit = true;
    //             state.isLoading = false;
    //             state.user = payload;
    //         });
    // }
})

export const userSelector = (state: {user: TUserState }) => state.user
//console.log(userSelector);

export default userSlice;