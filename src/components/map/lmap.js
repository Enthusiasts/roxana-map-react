/**
 * Created by Vlad on 26.02.2016.
 */
var React = require('react');
var RL = require('react-leaflet');
var Properties = require('../../const/properties');

const Map = RL.Map;
const TileLayer = RL.TileLayer;

var LMap = React.createClass({
    render: function()
    {
        return  (
            <Map className="roxana-map" center={Properties.MAP_CENTER} zoom={Properties.MAP_ZOOM}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        );
    }

});

module.exports = LMap;