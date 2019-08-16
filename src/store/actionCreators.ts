import axios from 'axios'
import { DATA_INIT, SESSION_SET, OPTION_SET, COSTOMER_INFO } from './actionTypes'

import store from "./index"
// import { async } from 'q';
//数据初始化  登录

//action



const loginInit = async () => {
    let res = await axios.get("getTokenId");
    return (res.data.session_id);
}
const sessionaInit = (value: string) => ({
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
        const { API } = store.getState();
        await axios.get(API.login, {
            params: {
                u: '00339',//账号
                p: '123',//密码
            }
        });
        const session = await loginInit();
        const actions = sessionaInit(session)
        dispatch(actions);
    }
}

//获取客户代码
//action
const option_set = (value: any) => ({
    type: OPTION_SET,
    value
})
//function
export const customer = () => {
    return async (dispatch: Function) => {
        const { API } = store.getState();

        //获取客户代码列表
        let obj = await axios.get(API.c_customerCode)
        let List = obj.data.info_list.filter((res: any) => {
            return res.code;
        });
        //获取收货方式
        let obj_type = await axios.get(API.c_tradeType)
        let type_list = obj_type.data.info_list.filter((res: any) => {
            return res.id;
        });



        let action_type = option_set({ 'D_type_option': type_list, 'customerCode': List });
        dispatch(action_type);
    }
}

//获取客户资料
//ACTION
const Customer_info_set = (value: Object) => (
    {
        type: COSTOMER_INFO,
        value
    }
)
//FUNCTION
export const get_Customer_info = (ID: string) => {
    return async (dispatch: Function) => {
        const { API } = store.getState();
        let { data } = await axios.get(API.c_customer, {
            params: {
                id: ID
            }
        });

        //联系人默认设定
        let purchase_contact;
        if (typeof data.items === "object" && data.items.length > 0) {
            purchase_contact = data.items.filter((item: any) => {
                return item.is_default && item.contacts;
            })
        }
        //收货地址默认设定
        let address;
        if (typeof data.c_cust_address_entries === "object" && data.c_cust_address_entries.length > 0) {
            address = data.c_cust_address_entries.filter((item: any) => {
                return item.is_default && item.address;
            })
        }
        //发票地址默认设定
        let invoice_address;
        if (typeof data.c_cust_invoice_entries === "object" && data.c_cust_invoice_entries.length > 0) {
            invoice_address = data.c_cust_invoice_entries.filter((item: any) => {
                return item.is_default && item.address;
            })
        }
        let Customer_page = {
            code: ID,
            name: data.name,
            quot_type: 'single',
            customer_type: data.customer_type ? data.customer_type.title : "",
            country: data.country,
            customer_agent: data.customer_agent || '无',
            currency: data.currency,
            payment_terms: data.payment_terms,
            tax_name: data.tax_name,
            rate: 1,
            tax_rate: data.tax_rate,
            saler: data.saler[0],
            delivery_type: data.delivery_type,
            destination: data.destination,
            purchase_contact_option: data.items.filter((item: any) => {
                return item.contacts;
            }),
            purchase_contact: purchase_contact[0] ? purchase_contact[0].id : "",
            phone_number: purchase_contact[0] ? purchase_contact[0].phone_number : "",
            email: purchase_contact[0] ? purchase_contact[0].email : "",
            address: address[0] ? address[0].address : "",
            invoice_address: invoice_address[0] ? invoice_address[0].address : "",
            c_cust_invoice_entries:data.c_cust_invoice_entries.filter((item: any) => {
                return item.address;
            }),
            c_cust_address_entries:data.c_cust_address_entries.filter((item: any) => {
                return item.address;
            }),

        }

        let res_HL = await axios.get(API.c_sgc_exchange,
            {
                params: {
                    sourcecurrency: Customer_page.currency.id,
                    valid: true
                }
            });
        Customer_page.rate = res_HL.data.info_list[0] ? res_HL.data.info_list[0].rate : 1;//汇率  无 
        let action = Customer_info_set(Customer_page);
        dispatch(action);
    }
}