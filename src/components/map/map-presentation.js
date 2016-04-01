/**
 * Created by Vlad on 26.02.2016.
 */
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var _ = require('underscore');
var L = require('leaflet');

var Properties = require('../../const/properties');
var EntertainmentInfo = require('./entertainment-info');
var LocateControl = require('./controls/locate-control');
var UserActions = require('../../actions/user');
var StartPointPU = require('./popUps/start-point-pu');

const Map = ReactLeaflet.Map;
//const Marker = ReactLeaflet.Marker;
const Marker = require('./layers/marker');
const MarkerCluster = require('./layers/marker-cluster');
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
                            id = {"_" + ent.id}
                            position={{lon: ent.longitude, lat: ent.latitude}}
                            icon = {this.getIcon({like: 1, cost: 3, checkin: 2},ent.type_en)}
                        >
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
    // red - like green - cost blue - chechin
    getIcon: function(clusters, type){
        var r = 0;
        var g = 0;
        var b = 0;
        var i;
        if (clusters.like) r = Math.round((clusters.like/Properties.CLUSTER.max(Properties.CLUSTER.TYPE.LIKE))*100+100);
        if (clusters.cost) g = Math.round((clusters.cost/Properties.CLUSTER.max(Properties.CLUSTER.TYPE.COST))*100+100);
        if (clusters.checkin) b = Math.round((clusters.checkin/Properties.CLUSTER.max(Properties.CLUSTER.TYPE.CHECKIN))*100+100);

        switch (type){
            case Properties.ENTERTAINMENT.TYPE.CAFE:
                i = "fa fa-coffee fa-3";
                break;
            case Properties.ENTERTAINMENT.TYPE.RESTAURANT:
                i = "fa fa-cutlery fa-3";
                break;
            case Properties.ENTERTAINMENT.TYPE.BAR:
                i = "fa fa-beer fa-3";
                break;
            case Properties.ENTERTAINMENT.TYPE.CLUB:
                i = "fa fa-houzz fa-3";
                break;
            default:
                i = "fa fa-map-marker fa-3";
        }
        return L.divIcon({
            iconSize: [50,50],
            className: "mapMarker",
            html: "<i class = \""+i+"\" style=\"color: rgb("+r+", "+g+", "+b+")\" >"
        });
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
                <MarkerCluster>
                    {this.renderEntertainments()}
                </MarkerCluster>
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