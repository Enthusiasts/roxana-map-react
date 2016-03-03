/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var RouteList = require('./route-list');

var RouteTrace = React.createClass({
    render: function()
    {
        return (
            <div>
                <RouteList isAuthorized = {true} items={[{id: 0, title: "СОХО", zoneTitle: "район замоскворечье", longitude: 55.75, latitude: 37.61}]}/>
            </div>
        );
    }
});

module.exports = RouteTrace;