/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');

var NavUnknownElem = React.createClass({
    render: function(){
        return  (
            <li className="pure-menu-item">
                <a href="" className="pure-menu-link">{this.props.bname}</a>
            </li>
        );
    }

});

module.exports = NavUnknownElem;