import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getDataJsonStorage, setCookie, setDataJsonStorage, setDataTextStorage } from '../../util/utilMethod';
import { ACCESS_TOKEN, USER_LOGIN, httpClient } from '../../util/util';
import { UserLoginType } from '../../pages/Login/Login';
import { DispatchType } from '../store';
import { routeLink } from '../../App';

export interface UserProfileType {
    ordersHistory: any[];
    email:         string;
    name:          string;
    password:      null;
    gender:        boolean;
    phone:         string;
    facebookId:    string;
    deleted:       boolean;
    avatar:        string;
    image:         string;    
} 

export interface UserLoggedType {
    email:string,
    accessToken:string
}
export interface UserReducerType {
    userLogin: UserLoggedType | null,
    userProfile: UserProfileType | null
}

const initialState:UserReducerType = {
    userLogin: getDataJsonStorage(USER_LOGIN),
    userProfile: null
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setLoginAction : (state:UserReducerType, action:PayloadAction<UserLoggedType>) => {
        state.userLogin = action.payload;
    },
    setProfileAction: (state:UserReducerType, action:PayloadAction<UserProfileType>) => {
        state.userProfile = action.payload;
    }
  }
});

export const {setLoginAction, setProfileAction} = userReducer.actions

export default userReducer.reducer

export const loginApiActionAsync = (userLogin:UserLoginType) => {
    return async (dispatch: DispatchType) => {
        try {
            const res = await httpClient.post('/api/users/signin', userLogin);

            // Sau khi đăng nhập thành công thì chuyển trang qua profile đồng thời lưu thông tin vào localstorage
            setDataJsonStorage(USER_LOGIN, res.data.content);
            setDataTextStorage(ACCESS_TOKEN, res.data.content.accessToken)
            setCookie(ACCESS_TOKEN, res.data.content.accessToken, 30);
            const action:PayloadAction<UserLoggedType> = setLoginAction(res.data.content);
            dispatch(action);
            routeLink.push('/profile')


        }catch(err){
            console.log(err)
        }
    }
};

export const getProfileActionAsync = () => {

    return async (dispatch:DispatchType) => {
        const res = await httpClient.post('/api/users/getProfile');

        const action:PayloadAction<UserProfileType> = setProfileAction(res.data.content);
        dispatch(action);
    }
}