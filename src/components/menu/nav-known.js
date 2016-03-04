/**
 * Created by Vlad on 03.03.2016.
 */
var React = require('react');
var Properties = require('../../const/properties');

var NavKnownElem = require('./nav-known-elem');
var RouteTrace = require('../route/route-container');
var UserInfo = require('../user/user-instagram');

var NavKnown = React.createClass({

    render: function(){

        return (
            <div id="knownMenuList">
                <div className="form-group has-feedback ">
                    <input type="text" className="form-control squaredBorders" placeholder="Выберите место" />
                    <i className="glyphicon glyphicon-search form-control-feedback"/>
                </div>

                <ul className="pure-menu-list">
                    <li className="pure-menu-heading"><b>Заведения</b></li>
                    <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.CAFE} />
                    <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.BAR} />
                    <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.RESTAURANT} />
                    <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.CLUB}/>
                </ul>

                <RouteTrace/>
            </div>
        )
    }
});

module.exports = NavKnown;