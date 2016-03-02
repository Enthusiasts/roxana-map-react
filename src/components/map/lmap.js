/**
 * Created by Vlad on 26.02.2016.
 */
var React = require('react');
var RL = require('react-leaflet');
var Properties = require('../../properties');

var LMap = React.createClass({
    render: function()
    {
        return  (
            <RL.Map className="roxana-map" center={Properties.MAP_CENTER} zoom={Properties.MAP_ZOOM}>
                <RL.TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </RL.Map>
        );
    }

});

module.exports = LMap;