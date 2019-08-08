const defaultState = {
    inputValue:{a:"86",CName:"????/"}
}  //默认数据
export default (state = defaultState,action:{type:undefined,value:undefined})=>{  //就是一个方法函数
    if(action.type === undefined){
        return
    }
    if(action.type === "change_input"){
        console.log(action.value)
        return
    }
    //let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state;
    return state
}