import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Card } from 'antd'
import Require from './Require'
// import axios from 'axios'

interface Person {
    [article: string]: any,
    app: any,
    project: any,
}

const contentListNoTitle: Person = {
    article: <Require  inputValue={{a:'2'}} />,
    app: <p>app content</p>,
    project: <p>project content</p>,
};
const tabListNoTitle= [
    {
        key: 'article',
        tab: 'article',
    },
    {
        key: 'app',
        tab: 'app',
    },
    {
        key: 'project',
        tab: 'project',
    },
];


class TodoList extends Component<any> {
    state = {
        key: 'tab1',
        noTitleKey: 'app',
    };

    onTabChange = (key: any, type: string) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };
  
    componentDidMount() {
    
    }
    render() {

        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    onTabChange={key => {
                        this.onTabChange(key, 'noTitleKey');
                    }}
                >
                    {contentListNoTitle[this.state.noTitleKey]}
                </Card>
            </div>
        );
    }
}
export default TodoList;