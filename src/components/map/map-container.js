/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');
var Map = require('./map-presentation');

/*
var MapContainer = React.createClass({
    render: function()
    {
        return <Map entertainments={[{id: 0, longitude: 55.75, latitude: 37.61}]}/>;
    }
});
*/

// State может быть undefined
// TODO: выяснить, почему он может быть undefined
const mapStateToProps = (state) =>
{
    return {
        entertainments: [].concat(
            state.cafe ? state.cafe : [],
            state.restaurant? state.restaurant : [],
            state.bar ? state.bar : [],
            state.club ? state.club : [])
    };
};

const MapContainer = ReactRedux.connect(mapStateToProps)(Map);

module.exports = MapContainer;