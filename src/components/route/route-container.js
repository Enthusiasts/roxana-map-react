/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');

var RouteList = require('./route-list');

var Properties = require('../../const/properties');

const mapStateToProps = (state) =>
{
    console.log("Current state: ", state);

    return {
        items: state.Routes.items,
        isAuthorized: true,
        context: state.Routes.context,
        error: state.Routes.error,
        message: state.Routes.message
    };
};

const RouteContainer = ReactRedux.connect(mapStateToProps)(RouteList);

module.exports = RouteContainer;