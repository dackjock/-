
let session ='xxx';
const API ={
    login:'api/login',//登录
    c_customerCode:`api/invoke/${session}/c_customer.query`,//客户代码搜索
    c_customer:`api/data/${session}/c_customer.view`,//客户代码资料
    c_tradeType:`api/invoke/${session}/c_tradeType.query`,//获取交货方式
    c_sgc_exchange:`api/invoke/${session}/c_sgc_exchange.query`,//获取汇率
}
export default  API ;