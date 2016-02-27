/**
 * Created by debal on 25.02.2016.
 */
var React = require('react');
var UserMenu = require('./usermenu-instagram');

var RoxanaApp = React.createClass({
    render: function() {
        return (
            <div>
                <UserMenu />
            </div>
        );
    }
});

module.exports = RoxanaApp;