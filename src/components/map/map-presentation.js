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

var MapPresentation = React.createClass({
    renderEntertainments: function()
    {
        if (this.props.entertainments)
        {
            return this.props.entertainments.map(
                ent => {
                    if (ent) {
                        return this.props.entertainments
                        (
                            <Marker
                                key={ent.id}
                                position={{lon: ent.longitude, lat: ent.latitude}}>
                            </Marker>
                        );
                    }
                }
            );
        } else return null;
    },

    render: function()
    {
        var entertainments = this.renderEntertainments();
        return  (
            <Map className="roxana-map"
                 center={Properties.MAP_CENTER}
                 zoom={Properties.MAP_ZOOM}
                 zoomControl={false}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomControl
                    position="topright"
                    zoomInTitle="Увеличить"
                    zoomOutTitle="Уменьшить"
                />
                {entertainments}
            </Map>
        );
    }

});

MapPresentation.propTypes = {
    entertainments: React.PropTypes.array.isRequired
};

module.exports = MapPresentation;