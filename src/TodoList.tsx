import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Card } from 'antd'
import Require from './Require'
import store from './store'
import { getTodoList } from "./store/actionCreators"
// import axios from 'axios'

interface Person {
    [article: string]: any,
    app: any,
    project: any,
}

const contentListNoTitle: Person = {
    article: <Require />,
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
        const action = getTodoList();
        store.dispatch(action);
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