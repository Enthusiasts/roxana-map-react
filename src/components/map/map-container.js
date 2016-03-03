/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var Map = require('./map-presentation');

var MapContainer = React.createClass({
    render: function()
    {
        return <Map entertainments={[{id: 0, longitude: 55.75, latitude: 37.61}]}/>;
    }
});

module.exports = MapContainer;