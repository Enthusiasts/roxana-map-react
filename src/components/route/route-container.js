/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');

var RouteList = require('./route-list');

var Properties = require('../../const/properties');

const mapStateToProps = (state) =>
{
    return {
        items: state.Routes.items,
        isAuthorized: state.User.isAuthorized,
        context: state.Routes.context,
        error: state.Routes.error,
        message: state.Routes.message,
        userLocation: state.User.location
    };
};

const RouteContainer = ReactRedux.connect(mapStateToProps)(RouteList);

module.exports = RouteContainer;