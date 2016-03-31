/**
 * Created by debalid on 25.03.2016.
 */
var _ = require('underscore');
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var L = require('leaflet');
require('leaflet.markercluster');

class MarkerCluster extends ReactLeaflet.MapLayer {
    componentWillMount() {
        super.componentWillMount();
        this.leafletElement = L.markerClusterGroup({
            chunkedLoading: true,
            chunkInterval: 50,
            chunkDelay: 100,
            maxClusterRadius: 200
        });
        this.markers = {};
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentDidUpdate() {
        this.leafletElement.clearLayers();
        var toAdd = _.toArray(this.markers).filter(x => x);
        this.leafletElement.addLayers(toAdd);
    }

    render() {
        return this.renderChildrenWithProps({markers: this.markers});
    }
}

module.exports = MarkerCluster;