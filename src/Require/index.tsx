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

import { FormComponentProps } from 'antd/lib/form';
//import PropTypes from 'prop-types'
import { Dispatch } from 'redux';

interface YProps extends FormComponentProps {
    inputValue: {
        a: string,
        customer: string,
        CType: string,
        country: string,

    };
    dispatch: Dispatch<any>
}
const { Option } = Select;
const { createFormField } = Form;

class Require extends Component<YProps> {
    handleSubmit = (e: React.FormEvent) => {
        const { form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        const { form: { getFieldDecorator } } = this.props;
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
                                            <Option value="86">+86</Option>
                                            <Option value="87">+87</Option>
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
                            客户名称 :{this.props.inputValue.customer}
                        </div>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="报价方法">
                            {getFieldDecorator('radio-group', { initialValue: "1" })(
                                <Radio.Group>
                                    <Radio value="1">单个型号</Radio>
                                    <Radio value="2">多个型号</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            客户类型 :{this.props.inputValue.CType}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            所属国家 :{this.props.inputValue.CType}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            客户代理 :
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <div style={{ lineHeight: '40px' }}>
                            币种 :
                        </div>
                    </Col>
                    <Col span={8} >
                        <div style={{ lineHeight: '40px' }}>
                            汇率 :
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            付款条件 :
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            税种 :
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '40px' }}>
                            税率 :
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} >
                        <div style={{ lineHeight: '40px' }}>
                            业务员 :
                        </div>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="交货方式">
                            {getFieldDecorator('code', {
                            })(
                                <Select>
                                    <Option value="DDP">DDP</Option>
                                    <Option value="FCB">FCB</Option>
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
                                    <Option value="DDP">DDP</Option>
                                    <Option value="FCB">FCB</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <div style={{ lineHeight: '40px' }}>
                            联系号码 :
                        </div>
                    </Col>
                    <Col span={8} >
                        <div style={{ lineHeight: '40px' }}>
                            邮件 :
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item labelCol={{span:2}} label="收货地址">
                            {getFieldDecorator('address', {
                        })(
                            <Select>
                                <Option value="DDP">DDP</Option>
                                <Option value="FCB">FCB</Option>
                            </Select>
                        )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item labelCol={{span:2}} label="发票">
                            {getFieldDecorator('address2', {
                        })(
                            <Select>
                                <Option value="DDP">DDP</Option>
                                <Option value="FCB">FCB</Option>
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
        inputValue: state.inputValue
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
            //console.log(values);
        },
        mapPropsToFields(props) {
            // console.log('mapPropsToFields', props);
            return {
                code: createFormField({ value: props.inputValue.a }),
            };
        },
    }
)(Require))