/**
 * Created by debal on 25.02.2016.
 */
var React = require('react');
var Menu = require('./menu/menu');
var Lmap = require('./map/lmap');

var RoxanaApp = React.createClass({
    render: function()
    {
        return (
            <div className="heighted">
                <div className="header">
                    <img src="style/image/logo.png" alt=""/>
                </div>
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>
                <Menu />
                <Lmap />
            </div>
        );
    }
});

module.exports = RoxanaApp;