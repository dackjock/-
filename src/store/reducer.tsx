const defaultState = {
    inputValue:{a:11111}
}  //默认数据
export default (state = defaultState,action:{type:undefined,value:undefined})=>{  //就是一个方法函数
    if(action.type === undefined){
        return
    }
    //let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state;
    return state
}