import axios from 'axios'
import { DATA_INIT, SESSION_SET } from './actionTypes'

import store from "./index"
//数据初始化  登录

//action



const loginInit = async () => {
    let res = await axios.get("getTokenId");
    return (res.data.session_id);
}
export const sessionaInit = (value: string) => ({
    type: SESSION_SET,
    value
})

//funciton
export const DataInit = (value: any) => ({
    type: DATA_INIT,
    value
})
export const getTodoList = () => {
    return async (dispatch: Function) => {
        const {API}  = store.getState();
        await axios.get(API.login, {
            params: {
                u: '00339',//账号
                p: '123',//密码
            }
        });
        const session = await loginInit();
        const actions = sessionaInit(session)
        dispatch(actions);
        console.log(store.getState())

    }
}