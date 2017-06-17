import React, {Component} from 'react';
import axios from 'axios';
// var CategoryStore = require('../../scripts/stores/Category');
// var Filters = require('./Filters');
import Catalog from '../../components/catalog';

class App extends Component {
    state = {}
    // updateFromStoreState = () => {
    //     this.setState(this.store.getState());
    // }
    // componentWillMount() {
    //     this.store = new CategoryStore();
    //     this.store.on('change', this.updateFromStoreState);
    //     this.updateFromStoreState();
    // }
    // componentWillReceiveProps () {
    //     this.updateFromStoreState();
    // }

    componentDidMount() {

        // axios('https://api.zalando.com/categories?page=1&pageSize=9999').then(response => {
        //     console.log('response', response);
        //     this.setState({data: response.data})
        // });
        axios('https://api.zalando.com/articles?page=1&pageSize=24&category=all').then(response => {
            console.log('response', response);
            this.setState({data: response.data.content})
        })

    }

    getCurrentGender = () => {
        return this.props.params.gender || 'all';
    }
    getCurrentCategory = () => {
        return this.props.params.category || this.getCurrentGender();
    }
    getCategoryList = () => {
        // genders are also parent categories for some other categories,
        // so to find subcategory for particular gender we just filter
        // full list that we got from API
        return this.state.data.filter(function (category) {
            if (category.parentKey === this.props.params.gender) {
                return true;
            }
        }, this);
    }

    render() {
        // We have a "static" splash screen in document.body before React is loaded,
        // but we keep it replace it with rerendered one until categories are fetched
        // if (this.state.status === 'loading') {
        //     return <div className="splash"></div>;
        // }
        console.log(this.state);
        return (
            <div className="main">
                {/*<Filters gender={this.getCurrentGender()}*/}
                {/*category={this.props.params.category}*/}
                {/*categoryList={this.getCategoryList()} />*/}
                <Catalog category="all" state={this.state}/>
            </div>
        );
    }
}

export default App;
