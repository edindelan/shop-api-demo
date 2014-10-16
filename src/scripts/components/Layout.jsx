var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'Layout',
    render: function () {
        return (
            <div className="app">
                <nav>
                    <a href="/" className="logo">
                        <img className="logoImage" src="images/logo.png" alt="Zalando"/>
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
});
