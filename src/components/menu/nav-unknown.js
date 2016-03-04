/**
 * Created by Vlad on 03.03.2016.
 */
var React = require('react');
var Properties = require('../../const/properties');

var NavKnownElem = require('./nav-known-elem');
var RouteTrace = require('../route/route-container');
var UserInfo = require('../user/user-instagram');

var NavUnknown = React.createClass({

    render: function(){
        return (
            <div id="unknownMenuList" className="pure-menu">


            </div>
        )
    }
});

module.exports = NavUnknown;