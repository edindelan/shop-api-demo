import React, {Component} from 'react';
import CatalogArticle from '../catalog-article/';

class Catalog extends Component {
    render () {
        console.log(this.props);
        var list = this.props.state.data || [];
        return <div className={"catalog"}>
            {list.map(function(article) {
                return <CatalogArticle article={article} key={article.id} />;
            })}
        </div>;
    }
}

export default Catalog;
