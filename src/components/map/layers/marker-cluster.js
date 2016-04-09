/**
 * Created by debalid on 25.03.2016.
 */
var _ = require('underscore');
var React = require('react');
var ReactLeaflet = require('react-leaflet');
var L = require('leaflet');
//var Properties = require('../../../const/properties');
require('leaflet.markercluster');

class MarkerCluster extends ReactLeaflet.MapLayer {
    componentWillMount() {
        super.componentWillMount();
        this.leafletElement = L.markerClusterGroup({
            iconCreateFunction: this.props.iconCreateFunction,
            chunkedLoading: true,
            chunkInterval: 50,
            chunkDelay: 100,
            disableClusteringAtZoom: 16,
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
MarkerCluster.propTypes = {
  iconCreateFunction: React.PropTypes.func.isRequired
};

module.exports = MarkerCluster;