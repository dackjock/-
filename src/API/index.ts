
let session ='xxx';
const API ={
    login:'api/login',//登录
    c_customerCode:`api/invoke/${session}/c_customer.query`,//客户代码搜索
}
export default  API ;