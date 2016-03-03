/**
 * Created by Vlad on 03.03.2016.
 */
var React = require('react');
var NavUnknownElem = require('./nav-unknown-elem');
var RouteTrace = require('../route/route-trace');

var NavUnknown = React.createClass({

    render: function(){
        return (
            <div id="unknownMenuList" className="pure-menu">

                <ul className="pure-menu-list">
                    <li className="pure-menu-heading"><b>Заведения</b></li>
                    <NavUnknownElem bname="Кафе"/>
                    <NavUnknownElem bname="Бар"/>
                    <NavUnknownElem bname="Ресторан"/>
                    <NavUnknownElem bname="Клуб"/>
                </ul>

                <RouteTrace/>
            </div>
        )
    }
});

module.exports = NavUnknown;