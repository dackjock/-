import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { connect } from 'react-redux'  //引入连接器
import {
    Form,
    Input,

} from 'antd'
import { FormComponentProps } from 'antd/lib/form';
//import { object, any } from 'prop-types';

interface YProps extends FormComponentProps {
    inputValue: { a: string };
    inputChange: any,
}


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
    handleChange = (e: React.FormEvent) => {
        this.props.inputChange(e);
    }
    render() {
        const { form: { getFieldDecorator } } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
                        initialValue: this.props.inputValue.a
                    })(<Input onChange={this.handleChange} />)}
                </Form.Item>


            </Form>
        );
    }
}
const stateToProps = (state: any) => {
    return {
        inputValue: state.inputValue
    }
}
const dispatchToProps = (dispatch: any) => {
    return {
        inputChange(e: any) {
            console.log(e.target.value);
            dispatch({
                type: 'change_input',
                value: e.target.value
            })
        }
    }
}
export default Form.create<YProps>(
    {
        name: 'global_state',
        onFieldsChange(props, changedFields) {
            //   props.onChange(changedFields);
            console.log(props, changedFields);
        },
        onValuesChange(_, values) {
            //console.log(values);
        },
    }
)(
    connect(stateToProps, dispatchToProps)(Require),
)