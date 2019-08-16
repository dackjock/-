import {  SESSION_SET,OPTION_SET,COSTOMER_INFO } from './actionTypes'
import API from "../API"
const defaultState = {
    inputValue:{a:"",customer:"????/",},
    API:API,
    H_option:{customerCode:[]},
    customer_page:{code:""}
}  //默认数据
export default (state = defaultState,action:{type:undefined,value:any})=>{  //就是一个方法函数
 
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
    //选项设置

    if(action.type === OPTION_SET){
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        for (let key in action.value ){
            newState.H_option[key] = action.value[key];
        }
       
        return newState
    }
    //客户资料设置
    if(action.type === COSTOMER_INFO){
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.customer_page = action.value;
        return newState
    }
    //let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state;
    return state
}