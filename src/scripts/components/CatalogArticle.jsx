var React = require('react/addons');
var Router = require('react-router');

module.exports = React.createClass({
    displayName: 'CatalogArticle',
    render: function () {
        var article = this.props.article || {};
        return (
            <Router.Link to="article" params={article} className="catalogArticle" key={article.sku}>
                <img src={article.image.detail} alt={article.name} />
                <div className="name">{article.name}</div>
                <div className="price">
                    {article.price.formatted}
                </div>
            </Router.Link>
        );
    }
});
