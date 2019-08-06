import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {connect} from 'react-redux'  //引入连接器
import {
    Form,
    Input,

} from 'antd'
import { FormComponentProps } from 'antd/lib/form';
//import { object, any } from 'prop-types';


class Require extends Component<FormComponentProps> {
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
        const {form: { getFieldDecorator }} = this.props;
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
                    //    initialValue:this.props.inputValue
                    })(<Input />)}
                </Form.Item>
                
                  
            </Form>
        );
    }
}

export default Form.create<FormComponentProps>()(
    connect(null,null)(Require),
)