import React, { Component } from 'react';

import logo from '../../images/logo.png';

class Layout extends Component {
    render() {
        return (
            <div className="app">
                <nav>
                    <a href="." className="logo">
                        <img className="logoImage" src={logo} alt="Zalando"/>
                    </a>
                </nav>
                {this.props.children}
                <footer>
                    <a href="http://jobs.zalando.de" title="Help us build best online fashion experience">
                        We are hiring
                    </a>
                </footer>
            </div>
        );
    }
}

export default Layout;
