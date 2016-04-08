/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');
var _ = require('underscore');

var Map = require('./map-presentation');

const mapStateToProps = (state) => {
    console.log(state);

    var t =  {
        entertainments: _.chain(state.Entertainments.points)
            .pick((value, key) => {
                //console.log(value, key, state.Entertainments.naturalTypes.indexOf(key));
                return state.Entertainments.naturalTypes.indexOf(key) >= 0
                })
            .value(),

        likedEntertainmentIds: state.User.likedEntIds,
        polyLine: state.Routes.polyLine,
        popUps: state.User.popUps,
        isAuthorized: state.User.isAuthorized,
        clusters: state.Entertainments.clusters,
        focus: state.Entertainments.focus
    };
    console.log(t.entertainments);
    return t;
};

const MapContainer = ReactRedux.connect(mapStateToProps)(Map);

module.exports = MapContainer;