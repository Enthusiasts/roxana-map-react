/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');
var Map = require('./map-presentation');

const mapStateToProps = (state) =>
{
    return {
        entertainments: [].concat(
            state.Entertainments.cafe,
            state.Entertainments.restaurant,
            state.Entertainments.bar,
            state.Entertainments.club
        )
    };
};

const MapContainer = ReactRedux.connect(mapStateToProps)(Map);

module.exports = MapContainer;