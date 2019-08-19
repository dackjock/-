import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { connect } from 'react-redux'  //引入连接器
import {
    Form,
    Input,
    Row,
    Col,
    Select,
    Button,
    Radio,
} from 'antd';
import store from '../store'
import { FormComponentProps } from 'antd/lib/form';
import { Dispatch } from 'redux';
import { customer, get_Customer_info } from "../store/actionCreators"


export interface RequireProps extends FormComponentProps {
    dispatch: Dispatch<any>,
}

export interface RequireState {
    value: Number
}

class Require extends Component<RequireProps, RequireState> {

    constructor(props: RequireProps) {
        super(props);
        this.state = { value: 1 };
    }
    handleSubmit = (e: React.FormEvent) => {
        const { form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    onLayer = (e: any) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
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
        return (
            <Form {...formItemLayout} labelAlign='left' onSubmit={this.handleSubmit} className={'Require_From'}>
                <Row>
                    <Col span={8}>
                        <Form.Item label="客户型号">
                            {getFieldDecorator('customer_model', {
                                rules: [
                                    {
                                        required: true,
                                        // message: 'Please input your customer_model',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="PN版本">
                            {getFieldDecorator('pn_level', {
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="终端">
                            {getFieldDecorator('terminal', {
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="层数" labelCol={{ span: 2 }}>
                            {getFieldDecorator('ilcost', {
                                rules: [
                                    {
                                        required: true,
                                        // message: 'Please input your customer_model',
                                    },
                                ],
                            })(<Radio.Group onChange={this.onLayer} >
                                <Radio value={1}>
                                    Option A
                                </Radio>
                                <Radio value={2}>
                                    Option B
                                </Radio>
                                <Radio value={3}>
                                    Option C
                                </Radio>
                                <Radio value={4}>
                                    More...
                                  {this.state.value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                                </Radio>
                            </Radio.Group>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>

                    </Col>
                </Row>
            </Form>
        );
    }
}
const stateToProps = (state: any) => {
    return {

    }
}
export default connect(stateToProps)(Form.create<RequireProps>(
    {
        onValuesChange(_, values) {
        //    console.log( values)

        }
    }
)(Require))