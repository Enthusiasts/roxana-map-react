/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');
var RouteList = require('./route-list');

const mapStateToProps = (state) =>
{
    return {
        isAuthorized: state.Routes.isAuthorized,
        items: state.Routes.items
    };
};

const RouteTrace = ReactRedux.connect(mapStateToProps)(RouteList);

module.exports = RouteTrace;