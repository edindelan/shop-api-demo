import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CatalogArticle extends Component {
    render() {
        var article = this.props.article || {};
        return (
            <Link to={'article/' + article.id} className="catalogArticle">
                <img src={article.media.images[0].smallHdUrl} alt={article.name} />
                <div className="name">{article.name}</div>
                <div className="price">
                    {article.units[0].price.formatted}
                </div>
            </Link>
        );
    }
}

export default CatalogArticle;
