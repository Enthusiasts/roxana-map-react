/**
 * Created by Vlad on 26.02.2016.
 */
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var Properties = require('../../const/properties');

var EntertainmentInfo = require('./entertainment-info');

const Map = ReactLeaflet.Map;
const Marker = ReactLeaflet.Marker;
const Popup = ReactLeaflet.Popup;
const TileLayer = ReactLeaflet.TileLayer;
const ZoomControl = ReactLeaflet.ZoomControl;

var MapPresentation = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    renderEntertainments: function()
    {
        if (this.props.entertainments)
        {
            return this.props.entertainments.map(
                ent => {
                    return (
                        <Marker
                            key={ent.id}
                            position={{lon: ent.longitude, lat: ent.latitude}}>
                            <Popup>
                                <EntertainmentInfo
                                    store={this.context.store}
                                    entertainment={ent} />
                            </Popup>
                        </Marker>
                    );
                }
            );
        } else return null;
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
                <ZoomControl
                    position="topright"
                    zoomInTitle="Увеличить"
                    zoomOutTitle="Уменьшить"
                />
                {this.renderEntertainments()}
            </Map>
        );
    }

});

MapPresentation.propTypes = {
    entertainments: React.PropTypes.array.isRequired
};

module.exports = MapPresentation;