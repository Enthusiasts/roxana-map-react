/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');

var MenuElem = React.createClass({
    render: function(){
        return  (
            <div id="navTabs">
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><a href="#">Я не знаю,что ищю</a></li>
                    <li role="presentation" className=""><a href="#">Я знаю,что ищю</a></li>
                </ul>
            </div>

        );
    }

});

module.exports = MenuElem;