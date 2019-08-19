import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { connect } from 'react-redux'  //引入连接器
import {
    Form,
    // Input,
    Row,
    Col,
    Select,
    Button,
    Radio,
} from 'antd';
import store from '../store'
import { FormComponentProps } from 'antd/lib/form';
//import PropTypes from 'prop-types'
import { Dispatch } from 'redux';
import { customer, get_Customer_info } from "../store/actionCreators"
interface YProps extends FormComponentProps {
    inputValue: {
        a: string,
        customer: string,
        CType: string,
        country: string,
    };
    pageData: any
    dispatch: Dispatch<any>,
    H_option: any
}
const { Option } = Select;
const { createFormField } = Form;

class Customer extends Component<YProps> {
    state = {
        codeList: [],
        D_type_option: [],
        // pageData:{
        //     name: "",
        //     quot_type: 'single',
        //     customer_type: "",
        //     country: "",
        //     customer_agent:  "",
        //     currency: "",
        //     payment_terms: "",
        //     tax_name: "",
        //     rate:1,
        //     tax_rate: "",
        //     saler: "",
        //     delivery_type: "",
        //     destination: "",
        //     purchase_contact_option: "",
        //     purchase_contact: "",
        //     phone_number: "",
        //     email: "",
        // }
    };
    handleSubmit = (e: React.FormEvent) => {
        const { form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    constructor(props: YProps) {
        super(props)
        this.storeChange = this.storeChange.bind(this)  //转变this指向
        store.subscribe(this.storeChange) //订阅Redux的状态
    }
    storeChange() {
        let state = store.getState();
        this.setState({
            codeList: state.H_option.customerCode,
            D_type_option: state.H_option.D_type_option,
        })
    }
    componentDidMount() {
        let _this = this;
        // //获取客户代码
        // console.log(_this.props)
        if (_this.props.H_option.customerCode.length <= 0) {
            let action = customer();
            store.dispatch(action);
        } else {
            _this.setState({
                codeList: _this.props.H_option.customerCode,
                D_type_option: _this.props.H_option.D_type_option,
            });
        }

    }
    render() {
        const { form: { getFieldDecorator } } = this.props;
        const { codeList, D_type_option } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const itemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        return (
            <Form {...formItemLayout} labelAlign='left' onSubmit={this.handleSubmit} className={'Require_From'}>
                <Row>
                    {/* <Col span={8}>
                        <Form.Item label="E-mail">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                    </Col> */}
                    <Col span={8}>
                        <Row type={'flex'} >
                            <Col span={16}>
                                <Form.Item {...itemLayout} label="客户代码">
                                    {getFieldDecorator('code', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择客户代码',
                                            },
                                        ],

                                    })(
                                        <Select
                                            showSearch
                                            filterOption={(input, option: any) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {codeList.map((d: any) => (
                                                <Option key={d.id}>{d.code}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6} style={{ lineHeight: '40px', paddingLeft: "10px" }} >
                                <Button type="default" shape="circle" icon="dash" size={'small'} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            客户名称 :{this.props.pageData.name}
                        </div>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="报价方法">
                            {getFieldDecorator('radio-group', { initialValue: "1" })(
                                <Radio.Group>
                                    <Radio value="single">单个型号</Radio>
                                    <Radio value="doubles">多个型号</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            客户类型 :{this.props.pageData.customer_type}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            所属国家  :{this.props.pageData.country ? this.props.pageData.country.name : ""}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            客户代理 :{this.props.pageData.customer_agent}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <div style={{ lineHeight: '40px' }}>
                            币种 :{this.props.pageData.currency ? this.props.pageData.currency.title : ""}
                        </div>
                    </Col>
                    <Col span={8} >
                        <div style={{ lineHeight: '40px' }}>
                            汇率 :{this.props.pageData.rate}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            付款条件 :{this.props.pageData.payment_terms ? this.props.pageData.payment_terms.title : ""}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            税种 :{this.props.pageData.tax_name ? this.props.pageData.tax_name.title : ""}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            税率 :{this.props.pageData.tax_rate}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} >
                        <div style={{ lineHeight: '40px' }}>
                            业务员 :{this.props.pageData.saler ? this.props.pageData.saler.name : ""}
                        </div>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="交货方式">
                            {getFieldDecorator('delivery_type', {
                            })(
                                <Select>
                                    {D_type_option.map((d: any) => (
                                        <Option key={d.id}>{d.name}</Option>
                                    ))}

                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <div style={{ lineHeight: '40px' }}>
                            目的地 :
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>

                        <Form.Item label="采购联系人">
                            {getFieldDecorator('conectMan', {
                            })(
                                <Select>

                                    {this.props.pageData.purchase_contact_option && this.props.pageData.purchase_contact_option.map((d: any) => (
                                        <Option key={d.id}>{d.contacts}</Option>
                                    ))}
                                    {/* <Option value="DDP">DDP</Option>
                                    <Option value="FCB">FCB</Option> */}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <div style={{ lineHeight: '40px' }}>
                            联系号码 :{this.props.pageData.phone_number}
                        </div>
                    </Col>
                    <Col span={8} >
                        <div style={{ lineHeight: '40px' }}>
                            邮件 :{this.props.pageData.email}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item labelCol={{ span: 2 }} label="收货地址">
                            {getFieldDecorator('address', {
                            })(
                                <Select>
                                    {this.props.pageData.c_cust_address_entries && this.props.pageData.c_cust_address_entries.map((d: any) => (
                                        <Option key={d.address}>{d.address}</Option>
                                    ))}

                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item labelCol={{ span: 2 }} label="发票地址">
                            {getFieldDecorator('invoice_address', {
                            })(
                                <Select >
                                    {this.props.pageData.c_cust_invoice_entries && this.props.pageData.c_cust_invoice_entries.map((d: any) => (
                                        <Option key={d.address}>{d.address}</Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form >
        );
    }
}
const stateToProps = (state: any) => {
    return {
        inputValue: state.inputValue,
        API: state.API,
        H_option: state.H_option,
        pageData: state.customer_page
    }
}
// const dispatchToProps = (dispatch: any) => {
//     return {
//         inputChange(e: any) {
//             dispatch({
//                 type: 'change_input',
//                 value: e.target.value
//             })
//         }
//     }
// }


export default connect(stateToProps)(Form.create<YProps>(
    {
        name: 'global_state',
        onFieldsChange(props, changedFields) {
            // console.log(props, changedFields);
            //  console.log(changedFields);
            // props.dispatch({
            //     type: 'change_input',
            //     value: changedFields.email.value
            // })
        },
        onValuesChange(_, values) {
            //   console.log(values);

            if (values.code) {

                let action = get_Customer_info(values.code);
                store.dispatch(action);
            }
        },
        mapPropsToFields(props) {
            console.log('mapPropsToFields', props);

            return {
                'code': createFormField({ value: props.pageData.code }),
                'radio-group': createFormField({ value: props.pageData.quot_type }),
                'delivery_type': createFormField({ value: props.pageData.delivery_type ? props.pageData.delivery_type.id : "" }),
                'conectMan': createFormField({ value: props.pageData.purchase_contact }),
                'invoice_address': createFormField({ value: props.pageData.invoice_address }),
                'address': createFormField({ value: props.pageData.address }),
            };
        },
    }
)(Customer))