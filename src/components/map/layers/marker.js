/**
 * Created by debalid on 31.03.2016.
 */
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var L = require('leaflet');
require('leaflet.markercluster');

class Marker extends ReactLeaflet.Marker {
    componentDidMount() {
        this.bindLeafletEvents(this._leafletEvents);
        this.props.markers[this.props.id] = this.leafletElement;
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.props.markers[this.props.id] = undefined;
    }
}

Marker.propTypes = {
    ...ReactLeaflet.Marker.propTypes,
    id: React.PropTypes.string.isRequired,
    markers: React.PropTypes.object
};

module.exports = Marker;