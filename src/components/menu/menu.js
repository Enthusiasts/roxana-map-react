/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');
var MenuElems = require('./nav-tabs');
var UserInstagram = require('../user/menu-instagram');

var Menu = React.createClass({
    render: function(){
        return  (
            <nav id="menu" className={this.props.propClass}>
                <MenuElems/>

            </nav>
        );
    }
});

module.exports = Menu;