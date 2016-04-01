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
        this.leafletElement.entertainment = this.props.entertainment;
        this.props.markers['_'+this.props.entertainment.id] = this.leafletElement;
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.props.markers[this.props.entertainment.id] = undefined;
    }

}

Marker.propTypes = {
    ...ReactLeaflet.Marker.propTypes,
    entertainment: React.PropTypes.object.isRequired,
    markers: React.PropTypes.object
};

module.exports = Marker;