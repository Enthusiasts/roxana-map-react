/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');
var RouteList = require('./route-list');

// State может быть undefined
// TODO: выяснить, почему он может быть undefined
const mapStateToProps = (state) =>
{
    return {
        isAuthorized: state.isAuthorized
            ? state.authorized
            : false,
        items: state.items
            ? state.items
            : []
    };
};

const RouteTrace = ReactRedux.connect(mapStateToProps)(RouteList);

module.exports = RouteTrace;