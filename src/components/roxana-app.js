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
            <div id="layout">
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