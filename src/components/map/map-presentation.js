/**
 * Created by Vlad on 26.02.2016.
 */
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var _ = require('underscore');

var Properties = require('../../const/properties');
var EntertainmentInfo = require('./entertainment-info');
var LocateControl = require('./controls/locate-control');
var UserActions = require('../../actions/user');
var StartPointPU = require('./popUps/start-point-pu');

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
    openStartPointPopUp: function (mouseEvent){

        var latlng = mouseEvent.latlng;
        if (!this.props.popUps.startPointPopUpActive.active){
            this.context.store.dispatch(UserActions.startPointPopUpActive(true, latlng.lat, latlng.lng));
        }
        else {
            this.context.store.dispatch(UserActions.startPointPopUpActive(false, null, null));
        }
    },

    renderEntertainments: function()
    {
        if (this.props.entertainments)
        {
            var t = _.chain(this.props.entertainments)
                .mapObject(x => _.values(x))
                .values()
                .flatten()
                .value();
            return t.map(
                ent => {
                    return (
                        <Marker
                            key={ent.id}
                            position={{lon: ent.longitude, lat: ent.latitude}}>
                            <Popup>
                                <EntertainmentInfo
                                    store={this.context.store}
                                    liked={this.props.likedEntertainmentIds.indexOf(ent.id) != -1}
                                    entertainment={ent} />
                            </Popup>
                        </Marker>
                    );
                }
            );
        } else return null;
    },
    renderStartPointPopUp: function(){

        var popup= this.props.popUps.startPointPopUpActive;
        if (popup.active){
            return (
                <Popup position = {{lat: popup.latitude, lng: popup.longitude}}>
                    <StartPointPU latitude = {popup.latitude} longitude = {popup.longitude} store = {this.context.store}/>
                </Popup>
            )}
        else return null;
    },

    render: function()
    {
        return  (
            <Map className="roxana-map"
                 center={{lat: Properties.MAP.CENTER.LATITUDE, lon: Properties.MAP.CENTER.LONGITUDE}}
                 zoom={Properties.MAP.ZOOM}
                 zoomControl={false}
                 onLocationFound={this.setUserLocation}
                 onClick={this.openStartPointPopUp}
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
                {this.renderStartPointPopUp()}
                <Polyline positions={this.props.polyLine} color={"red"}/>
                {this.renderEntertainments()}
            </Map>
        );
    }

});

MapPresentation.propTypes = {
    entertainments: React.PropTypes.object.isRequired,
    likedEntertainmentIds: React.PropTypes.array.isRequired,
    polyLine: React.PropTypes.array.isRequired,
    popUps: React.PropTypes.object.isRequired
};

module.exports = MapPresentation;