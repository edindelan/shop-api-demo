import $ from 'jquery';
import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import '../../scripts/util/slick';

class Article extends Component {
    state = {

    };

    componentDidUpdate() {
        const $slider = $(findDOMNode(this)).find('.slider');
        $slider.unslick();
        $slider.slick({
            dots: true
        });
    };

    componentDidMount() {
        const {match} = this.props;
        axios('https://api.zalando.com/articles/' + match.params.id).then(response => {
            this.setState({article: response.data});
        }, error => {
            console.log('err', error);
            this.setState({error})
        });
    }

    handleBack = () => {
        const {history} = this.props;
        // This method is provided by React Router
        // this.goBack();
        history.push('/');
    };

    render() {
        const { article, error } = this.state;
        if (error) {
            return (
                <div className="article">
                    <div className="message error">
                        <button className="back" onClick={this.handleBack}></button>
                        Sorry, article not found
                    </div>
                </div>
            );
        }
        if(article) {
            return (
                <div className="article">
                    <h1>
                        <button className="back" onClick={this.handleBack}></button>
                        {article.name}
                    </h1>
                    <div className="sliderWrapper">
                        <img className="brandLogo" src={article.brand.logoUrl}/>
                        <div className="pricePositioner">
                            {article.units[0].price.value !== article.units[0].originalPrice.value ?
                                <div className="originalPrice">{article.units[0].originalPrice.formatted}</div> : false}
                            <div className="currentPrice">{article.units[0].price.formatted}</div>
                        </div>
                        <div className="slider" ref={slider => {this.slider = slider}}>
                            {article.media.images.map(function (image, i) {
                                return (
                                    <div key={i} className="slide">
                                        <img src={image.smallHdUrl} key={i} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="details">
                        <h2>Sizes</h2>
                        <p>
                            {(article.units).map(function (unit, i) {
                                return <span key={i} className="size">{unit.size}</span>;
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
                        <a href={article.shopUrl} className="linkToShop">See on Zalando</a>
                    </div>
                </div>
            );
        }

        return <div>Empty</div>

    }
}

export default withRouter(Article);
