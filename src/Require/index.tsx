import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {
    Form,
    Input,

} from 'antd'
import { FormComponentProps } from 'antd/lib/form';
//import { object, any } from 'prop-types';


interface FormProps extends FormComponentProps {
    submitting: boolean;
  }
  

class Require extends Component<FormProps> {
    state = {
        autoCompleteResult: [],

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
                    })(<Input />)}
                </Form.Item>
                
                  
            </Form>
        );
    }
}
export default Form.create<FormProps>()(
    (Require),
  );