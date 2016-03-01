/**
 * Created by Vlad on 26.02.2016.
 */
var React = require('react');
var RL = require('react-leaflet');

const MAP_CENTER = [55.75, 37.61];
const MAP_ZOOM = 11;

var LMap = React.createClass({
    render: function()
    {
        return  (
            <RL.Map className="roxana-map" center={MAP_CENTER} zoom={MAP_ZOOM}>
                <RL.TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </RL.Map>
        );
    }

});

module.exports = LMap;