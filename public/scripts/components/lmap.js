/**
 * Created by Vlad on 26.02.2016.
 */
var React = require('react');
var Map, Marker, Popup, TileLayer = require('react-leaflet');


var LMap = React.createClass({
    render: function(){
        return  (
            <div className="main">
                <div id="map-container">

                </div>
            </div>);
    }

});

module.exports = LMap;