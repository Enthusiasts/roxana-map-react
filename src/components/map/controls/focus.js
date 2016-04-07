/**
 * Created by Vlad on 06.04.2016.
 */
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var L = require('leaflet');

class Focus extends ReactLeaflet.MapComponent {

    focus(array, lat, lng, zoom) {
        if (lat && lng && zoom) {
            this.props.map.setZoomAround({lat, lng}, zoom);
        }
        else {
            this.props.map.fitBounds(array);
        }
        this.props.map.invalidateSize({reset: true});
    }

    componentDidMount() {
        super.componentDidMount();
        var latitude = this.props.latitude;
        var longitude = this.props.longitude;
        var zoom = this.props.zoom;
        var focusPoints = this.props.focusPoints;
        this.focus(focusPoints, latitude, longitude, zoom);

    }

    componentShouldUpdate(nextProps) {
        return nextProps.focusPoints
    }

    componentDidUpdate() {
        //super.componentDidUpdate();
        console.log(':(');
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