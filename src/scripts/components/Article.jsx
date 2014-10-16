var React = require('react/addons');
var BaseStore = require('../stores/Base');
var Navigation = require('react-router').Navigation;
var $ = require('jquery');
require('../util/slick');

module.exports = React.createClass({
    displayName: 'Article',
    mixins: [Navigation],
    updateFromStoreState: function () {
        this.setState(this.store.getState());
    },
    componentWillMount: function () {
        if (this.props.params.sku) {
            this.store = new BaseStore(null, {
                resourceName: 'articles/' + this.props.params.sku
            });
            this.store.on('change', this.updateFromStoreState);
            this.updateFromStoreState();
        }
    },
    componentDidUpdate: function () {
        var $slider = $(this.getDOMNode()).find('.slider');
        $slider.unslick();
        $slider.slick({
            dots: true
        });
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.props.params.sku !== nextProps.params.sku) {
            this.store.resourceName = 'articles/' + nextProps.params.sku;
            this.store.update();
        }
    },
    handleBack: function () {
        // This method is provided by React Router
        this.goBack();
    },
    render: function () {
        var article = this.state.data;
        if (this.state.status === 'error') {
            return (
                <div className="article">
                    <div className="message error">
                        <button className="back" onClick={this.handleBack}></button>
                        Sorry, article not found
                    </div>
                </div>
            );
        }
        if (this.state.status === 'loading' || !article) {
            return <div className="catalog loading"></div>;
        }
        return (
            <div className="article">
                <h1>
                    <button className="back" onClick={this.handleBack}></button>
                    {article.name}
                </h1>
                <div className="sliderWrapper">
                    <img className="brandLogo" src={article.brand.logoUrl}/>
                    <div className="pricePositioner">
                        {article.price.value !== article.originalPrice.value ?
                            <div className="originalPrice">{article.originalPrice.formatted}</div> : false}
                        <div className="currentPrice">{article.price.formatted}</div>
                    </div>
                    <div className="slider">
                        {article.images.map(function (image, i) {
                            return (
                                <div class="slide">
                                    <img src={image.detail} key={i} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="details">
                    <h2>Sizes</h2>
                    <p>
                        {(article.sizes || article.manifestations).map(function (size) {
                            return <span className="size">{size.size}</span>;
                        })}
                    </p>
                    <h2>Description</h2>
                    <ul className="attributes">
                        {(article.attributes).map(function (attribute, i) {
                            return (
                                <li key={i}>
                                    <em>{attribute.name}: </em>
                                    {attribute.values.join(', ')}
                                </li>
                            );
                        })}
                    </ul>
                    <a href={article.url} className="linkToShop">See on Zalando</a>
                </div>
            </div>
        );
    }
});
