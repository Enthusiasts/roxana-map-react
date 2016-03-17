/**
 * Created by Vlad on 26.02.2016.
 */
var React = require('react');
var ReactLeaflet = require('react-leaflet');

var Properties = require('../../const/properties');
var EntertainmentInfo = require('./entertainment-info');
var LocateControl = require('./controls/locate-control');
var UserActions = require('../../actions/user');
var RouteActions = require('../../actions/routes');

const Map = ReactLeaflet.Map;
const Marker = ReactLeaflet.Marker;
const Popup = ReactLeaflet.Popup;
const Polyline = ReactLeaflet.Polyline;
const TileLayer = ReactLeaflet.TileLayer;
const ZoomControl = ReactLeaflet.ZoomControl;

var MapPresentation = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    setUserLocation: function(locationEvent)
    {
        var latlng = locationEvent.latlng;
        this.context.store.dispatch(UserActions.setLocation(latlng.lat, latlng.lng));
    },
    openContextMenu: function (mouseEvent){
        console.log(this.context.store.getState());
        var latlng = mouseEvent.latlng;
        this.context.store.dispatch(RouteActions.offerRouteList(latlng.lat, latlng.lng, ["Бары"]));
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
                 center={{lat: Properties.MAP.CENTER.LATITUDE, lon: Properties.MAP.CENTER.LONGITUDE}}
                 zoom={Properties.MAP.ZOOM}
                 zoomControl={false}
                 onLocationFound={this.setUserLocation}
                 onClick={this.openContextMenu}
            >
                <TileLayer
                    url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomControl
                    position="topright"
                    zoomInTitle="Увеличить"
                    zoomOutTitle="Уменьшить"
                />
                <LocateControl/>
                <Polyline positions={this.props.polyLine} color={"red"}/>
                {this.renderEntertainments()}
            </Map>
        );
    }

});

MapPresentation.propTypes = {
    entertainments: React.PropTypes.array.isRequired,
    polyLine: React.PropTypes.array.isRequired
};

module.exports = MapPresentation;