import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from "./components/layout";
import App from './components/app';
import Article from './components/article';
import './styles/main.less';

ReactDom.render(
    <Router>
        <Layout>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/article/:id" component={Article}/>
            </Switch>
        </Layout>
    </Router>
    , document.getElementById('app'));
