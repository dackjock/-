import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd'




class Require extends Component<any,any> {
    state = {
        autoCompleteResult: [],

    };
    
    constructor(props: object) {
        super(props);

    }
    componentDidMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        return (
            <div>
                <Row>
                    <Col span={8}>
                        col-8
                    </Col>
                    <Col span={8} offset={8}>
                        col-8
                    </Col>
                    <Col span={8} offset={8}>
                        col-8
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Require;