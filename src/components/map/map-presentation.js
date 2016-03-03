/**
 * Created by Vlad on 26.02.2016.
 */
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var Properties = require('../../const/properties');

const Map = ReactLeaflet.Map;
const Marker = ReactLeaflet.Marker;
const TileLayer = ReactLeaflet.TileLayer;
const ZoomControl = ReactLeaflet.ZoomControl;

var map = React.createClass({
    renderEntertainments: function()
    {
        return this.props.entertainments.map(
            ent => <Marker key={ent.id} position={[ent.longitude, ent.latitude]}/>
        );
    },

    render: function()
    {
        return  (
            <Map className="roxana-map"
                 center={Properties.MAP_CENTER}
                 zoom={Properties.MAP_ZOOM}
                 zoomControl={false}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomControl position="topright" zoomInTitle="Увеличить" zoomOutTitle="Уменьшить"/>
                {this.renderEntertainments()}
            </Map>
        );
    }

});

module.exports = map;