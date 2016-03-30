/**
 * Created by Vlad on 03.03.2016.
 */
var React = require('react');
var Properties = require('../../const/properties');

var UserMenuContainer = require('../user/menu-instagram-container');
var HistoryContainer = require('../history/history-container');

var NavUnknown = React.createClass({

    render: function(){
        return (
            <div id="unknownMenuList" className="pure-menu">
                <UserMenuContainer/>
                <HistoryContainer/>
            </div>
        )
    }
});

module.exports = NavUnknown;