/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');
var MenuElems = require('./menu-elems');
var UserInstagram = require('../user/user-instagram');

var Menu = React.createClass({
    render: function(){
        return  (
            <nav id="menu">
                <MenuElems/>

            </nav>
        );
    }
});

module.exports = Menu;