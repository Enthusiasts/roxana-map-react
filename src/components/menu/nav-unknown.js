/**
 * Created by Vlad on 03.03.2016.
 */
var React = require('react');
var NavUnknownElem = require('./nav-unknown-elem');
var RouteTrace = require('../route/route-container');
var Properties = require('../../const/properties');

var NavUnknown = React.createClass({

    render: function(){
        return (
            <div id="unknownMenuList" className="pure-menu">

                <ul className="pure-menu-list">
                    <li className="pure-menu-heading"><b>Заведения</b></li>
                    <NavUnknownElem type={Properties.ENTERTAINMENT_TYPE.CAFE} />
                    <NavUnknownElem type={Properties.ENTERTAINMENT_TYPE.BAR} />
                    <NavUnknownElem type={Properties.ENTERTAINMENT_TYPE.RESTAURANT} />
                    <NavUnknownElem type={Properties.ENTERTAINMENT_TYPE.CLUB}/>
                </ul>

                <RouteTrace/>
            </div>
        )
    }
});

module.exports = NavUnknown;