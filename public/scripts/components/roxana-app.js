/**
 * Created by debal on 25.02.2016.
 */
var React = require('react');
var AuthInstagram = require('./auth-instagram');

var RoxanaApp = React.createClass({
    render: function() {
        return (
            <div>
                <AuthInstagram />
            </div>
        );
    }
});

module.exports = RoxanaApp;