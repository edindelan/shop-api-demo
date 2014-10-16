var React = require('react/addons');
var CategoryStore = require('../stores/Category');
var Filters = require('./Filters');
var Catalog = require('./Catalog');

module.exports = React.createClass({
    displayName: 'App',
    updateFromStoreState: function () {
        this.setState(this.store.getState());
    },
    componentWillMount: function () {
        this.store = new CategoryStore();
        this.store.on('change', this.updateFromStoreState);
        this.updateFromStoreState();
    },
    componentWillReceiveProps: function () {
        this.updateFromStoreState();
    },
    getCurrentGender: function () {
        return this.props.params.gender || 'all';
    },
    getCurrentCategory: function () {
        return this.props.params.category || this.getCurrentGender();
    },
    getCategoryList: function () {
        // genders are also parent categories for some other categories,
        // so to find subcategory for particular gender we just filter
        // full list that we got from API
        return this.state.data.filter(function (category) {
            if (category.parentKey === this.props.params.gender) {
                return true;
            }
        }, this);
    },
    render: function () {
        // We have a "static" splash screen in document.body before React is loaded,
        // but we keep it replace it with rerendered one until categories are fetched
        if (this.state.status === 'loading') {
            return <div className="splash"></div>;
        }
        return (
            <div className="main">
                <Filters gender={this.getCurrentGender()}
                         category={this.props.params.category}
                         categoryList={this.getCategoryList()} />
                <Catalog category={this.getCurrentCategory()} />
            </div>
        );
    }
});
