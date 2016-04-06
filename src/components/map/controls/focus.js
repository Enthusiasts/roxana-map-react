/**
 * Created by Vlad on 06.04.2016.
 */
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var L = require('leaflet');

class Focus extends ReactLeaflet.MapComponent {

    focus (array ,lat, lon, zoom){
        if (lat || lon){
            this.props.map.fitBounds(array);
        }
        else {
            this.props.map.setZoomAround([lat,lon,zoom])
        }
    }

    componentDidMount() {
        super.componentDidMount();
        var latitude = this.props.latitude;
        var longitude = this.props.longitude;
        var zoom = this.props.zoom;
        var focusPoints = this.props.focusPoints;
        this.focus(latitude,longitude,zoom,focusPoints);

    }

    componentDidUpdate() {
        super.componentDidUpdate;
        var latitude = this.props.latitude;
        var longitude = this.props.longitude;
        var zoom = this.props.zoom;
        var focusPoints = this.props.focusPoints;
        this.focus(latitude,longitude,zoom,focusPoints);
    }

    render(){
        return null;
    }
}
module.exports = Focus;