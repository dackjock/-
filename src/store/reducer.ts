import {  SESSION_SET } from './actionTypes'
import API from "../API"
const defaultState = {
    inputValue:{a:"86",customer:"????/",},
    API:API
}  //默认数据
export default (state = defaultState,action:{type:undefined,value:undefined})=>{  //就是一个方法函数
    if(action.type === undefined){
        return state
    }
    //session设置
    if(action.type === SESSION_SET){
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.session = action.value;
        for(let key in newState.API){
            newState.API[key] =  newState.API[key].replace('xxx', newState.session);
        }
        return newState
    }
    //let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state;
    return state
}