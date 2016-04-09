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
const Focus = require('./controls/focus');
const Popup = ReactLeaflet.Popup;
const Polyline = ReactLeaflet.Polyline;
const TileLayer = ReactLeaflet.TileLayer;
const ZoomControl = ReactLeaflet.ZoomControl;

var MapPresentation = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    setUserLocation: function (locationEvent) {
        var latlng = locationEvent.latlng;
        this.context.store.dispatch(UserActions.setLocation(latlng.lat, latlng.lng));
    },
    openStartPointPopUp: function (mouseEvent) {

        var latlng = mouseEvent.latlng;
        if (!this.props.popUps.startPointPopUpActive.active) {
            this.context.store.dispatch(UserActions.startPointPopUpActive(true, latlng.lat, latlng.lng));
        }
        else {
            this.context.store.dispatch(UserActions.startPointPopUpActive(false, null, null));
        }
    },

    renderEntertainments: function () {
        if (this.props.entertainments) {
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
                            entertainment={ent}
                            position={{lon: ent.longitude, lat: ent.latitude}}
                            icon={this.getIcon(ent)}
                        >
                            <Popup>
                                <EntertainmentInfo
                                    store={this.context.store}
                                    liked={this.props.likedEntertainmentIds.indexOf(ent.id) != -1}
                                    entertainment={ent}/>
                            </Popup>
                        </Marker>
                    );
                }
            );
        } else return null;
    },
    renderStartPointPopUp: function () {

        var popup = this.props.popUps.startPointPopUpActive;
        if (popup.active) {
            return (
                <Popup position={{lat: popup.latitude, lng: popup.longitude}}>
                    <StartPointPU latitude={popup.latitude} longitude={popup.longitude} store={this.context.store}/>
                </Popup>
            )
        }
        else return null;
    },

    _getClusterValuesFromEntertainment: function (ent) {
        //ent.clustersCode is a string like '423' where each number is a value of cluster by order
        return  {
            costsValue: ent.clustersCode ? Number(ent.clustersCode.charAt(0)) : 0,
            likesValue: ent.clustersCode ? Number(ent.clustersCode.charAt(1)) : 0,
            checkinsValue: ent.clustersCode ? Number(ent.clustersCode.charAt(2)) : 0
        };
    },

    // red - like green - cost blue - chechin
    getIcon: function (ent) {
        if (ent.title == "b5534e557e2d06abb5c3d33d59e57b3d"){
            console.log(ent);
        }


        var i;
        var rgb = this.getColor(this._getClusterValuesFromEntertainment(ent));
        switch (ent.type_en) {
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
        var cheat = this.context.store.getState().Entertainments.points.CHEAT;
        if (typeof cheat !== "undefined" && typeof cheat[ent.id] !== "undefined") {
            i = "fa fa-map-marker fa-3";
        }
        return L.divIcon({
            iconSize: [50, 50],
            className: "mapMarker",
            html: "<i class = \"" + i + "\" style=\"color: rgb(" + rgb.red + ", " + rgb.green + ", " + rgb.blue + ")\" >"
        });
    },

    getColor: function (clusterValues) {
        var r = 0;
        var g = 0;
        var b = 0;

        var current = this.props.clusters;
        if (clusterValues.likesValue /*&& current.like.values.includes(clusterValues.likesValue)*/) {
            r = Math.round((clusterValues.likesValue / Properties.CLUSTER.max(Properties.CLUSTER.TYPE.LIKE)) * 100 + 100);
        }
        if (clusterValues.costsValue /*&& current.cost.values.includes(clusterValues.costsValue)*/) {
            g = Math.round((clusterValues.costsValue / Properties.CLUSTER.max(Properties.CLUSTER.TYPE.COST)) * 100 + 100);
        }
        if (clusterValues.checkinsValue /*&& current.checkin.values.includes(clusterValues.checkinsValue)*/) {
            b = Math.round((clusterValues.checkinsValue / Properties.CLUSTER.max(Properties.CLUSTER.TYPE.CHECKIN)) * 100 + 100);
        }
        return {red: r, green: g, blue: b}
    },

    getClusterIcon: function (cluster) {
        var red = 0;
        var green = 0;
        var blue = 0;

        var current = this.props.clusters;
        var markers = cluster.getAllChildMarkers();
        for (var i = 0; i < markers.length; i++) {
            var clusterValues = this._getClusterValuesFromEntertainment(markers[i].entertainment);

            if (clusterValues.likesValue && current[Properties.CLUSTER.TYPE.LIKE].values.includes(clusterValues.likesValue)) {
                red += clusterValues.likesValue;
            }
            if (clusterValues.costsValue && current[Properties.CLUSTER.TYPE.COST].values.includes(clusterValues.costsValue)) {
                green = green + clusterValues.costsValue;
            }
            if (clusterValues.checkinsValue && current[Properties.CLUSTER.TYPE.CHECKIN].values.includes(clusterValues.checkinsValue)) {
                blue += clusterValues.checkinsValue;
            }
        }

        red /= markers.length;
        green /= markers.length;
        blue /= markers.length;

        var rgb = this.getColor({likesValue: red, costsValue: green, checkinsValue: blue});

        return L.divIcon({
            iconSize: [100, 50],
            className: "mapMarker",
            html: "<i class = \"fa fa-dot-circle-o fa-3\" style=\"color: rgb(" + rgb.red + ", " + rgb.green + ", " + rgb.blue + ")\"></i><small> " + cluster.getChildCount() + "</small>"
        })
    },

    render: function () {
        return (
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
                <MarkerCluster iconCreateFunction={this.getClusterIcon}>
                    {this.renderEntertainments()}
                </MarkerCluster>
                <Focus
                    latitude={this.props.focus.latitude}
                    longitude={this.props.focus.longitude}
                    zoom = {this.props.focus.zoom}
                    focusPoints = {this.props.focus.focusPoints}
                    store = {this.context.store}
                />
            </Map>
        );
        /*
         <Focus
         latitude={this.props.focus.latitude}
         longitude={this.props.focus.longitude}
         zoom = {this.props.focus.zoom}
         focusPoints = {this.props.focus.focusPoints}
         />
        */
    }

});

MapPresentation.propTypes = {
    entertainments: React.PropTypes.object.isRequired,
    likedEntertainmentIds: React.PropTypes.array.isRequired,
    polyLine: React.PropTypes.array.isRequired,
    popUps: React.PropTypes.object.isRequired,
    clusters: React.PropTypes.object.isRequired,
    focus: React.PropTypes.object.isRequired
};

module.exports = MapPresentation;