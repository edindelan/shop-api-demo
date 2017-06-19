import React, { Component } from 'react';

class Filters extends Component {
    state =  {
            gender: '',
            category: '',
            categoryList: []
    };

    handleGenderChange = (e) => {
        // This method is provided by React Router
        this.transitionTo('gender', {
            gender: e.target.value
        });
    }

    handleCategoryChange = (e) => {
        this.transitionTo('catalog', {
            gender: this.props.gender,
            category: e.target.value
        });
    }

    render () {
        return (
            <div className="filters">
                <select onChange={this.handleGenderChange} value={this.props.gender}>
                    <option value="">Fashion for...</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
                <select disabled={this.props.categoryList.length ? '': 'disabled'}
                        onChange={this.handleCategoryChange}
                        value={this.props.category}>
                    <option value="">Category...</option>
                    {this.props.categoryList.map(function (category) {
                        return <option value={category.key}>{category.name}</option>;
                    })}
                </select>
            </div>
        );
    }
}

export default Filters;
