/**
 * Created by debal on 25.02.2016.
 */
var React = require('react');
var Menu = require('./menu/menu');
var MapContainer = require('./map/map-container');

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
                <MapContainer />
            </div>
        );
    }
});

module.exports = RoxanaApp;