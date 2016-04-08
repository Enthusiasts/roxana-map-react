/**
 * Created by Vlad on 06.04.2016.
 */
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var L = require('leaflet');
var _ = require('underscore');

var Entertainments = require('../../../actions/entertainments');

class Focus extends ReactLeaflet.MapComponent {

    focus(array, lat, lng, zoom) {

        if (typeof lat !== 'undefined' && typeof lng !== 'undefined' && typeof zoom !== 'undefined') {
            this.props.map.panTo({lat: Number(lat), lng: Number(lng)});
            this.props.map.setZoom(Number(zoom));
        }
        else {
            this.props.map.fitBounds(array);
        }
        this.props.map.invalidateSize({reset: true});
    }


    componentDidMount() {
        super.componentDidMount();
        /*this.props.map.on("moveend", function (event) {

         var center = this.props.map.getCenter();
         var zoom = this.props.map.getZoom();
         this.props.store.dispatch(Entertainments.setFocus([], center.lat, center.lng, zoom));
         }.bind(this));*/
        var latitude = this.props.latitude;
        var longitude = this.props.longitude;
        var zoom = this.props.zoom;
        var focusPoints = this.props.focusPoints;
        this.focus(focusPoints, latitude, longitude, zoom);

    }

    shouldComponentUpdate(nextProps) {
        const eps = 0.001;
        return _.difference(nextProps.focusPoints, this.props.focusPoints).length > 0
            || (typeof nextProps.latitude !== 'undefined'
                && typeof this.props.latitude !== 'undefined'
                && (((nextProps.latitude - this.props.latitude) > eps)
                || ((nextProps.latitude - this.props.latitude) < -1*eps)))
            || (typeof nextProps.longitude !== 'undefined'
                && typeof this.props.longitude !== 'undefined'
                && (((nextProps.longitude - this.props.longitude) > eps)
                || ((nextProps.longitude - this.props.longitude) < -1*eps)))
            || (typeof nextProps.zoom !== 'undefined'
                && typeof this.props.zoom !== 'undefined'
                && nextProps.zoom != this.props.zoom);
    }

    componentDidUpdate() {
        //super.componentDidUpdate();

        /*this.props.map.on("moveend", function (event) {

         var center = this.props.map.getCenter();
         var zoom = this.props.map.getZoom();
         this.props.store.dispatch(Entertainments.setFocus([], center.lat, center.lng, zoom));

         }.bind(this));*/
        var latitude = this.props.latitude;
        var longitude = this.props.longitude;
        var zoom = this.props.zoom;
        var focusPoints = this.props.focusPoints;
        this.focus(focusPoints, latitude, longitude, zoom);
    }

    render() {
        return null;
    }
}
module.exports = Focus;