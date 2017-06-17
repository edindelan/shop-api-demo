var React = require('react/addons');
var ArticleStore = require('../scripts/stores/Article');
var CatalogArticle = require('./CatalogArticle');

module.exports = React.createClass({
    displayName: 'Catalog',
    updateFromStoreState: function () {
        this.setState(this.store.getState());
    },
    componentWillMount: function () {
        this.store = new ArticleStore({
            category: this.props.category
        });
        this.store.on('change', this.updateFromStoreState);
        this.updateFromStoreState();
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.props.category !== nextProps.category) {
            this.store.update({
                category: nextProps.category
            });
        }
    },
    render: function () {
        var list = this.state.data || [];
        return <div className={"catalog " + this.state.status}>
            {list.map(function(article) {
                return <CatalogArticle article={article} key={article.id} />;
            })}
        </div>;
    }
});
