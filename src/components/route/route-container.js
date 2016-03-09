/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');

var RouteList = require('./route-list');

var Properties = require('../../const/properties');

const mapStateToProps = (state) =>
{
    const canSave = () =>
        state.Routes.context.current == Properties.ROUTE.CONTEXTS.CREATE ||
        isInEdit();

    const isInEdit = () =>
        state.Routes.context.current == Properties.ROUTE.CONTEXTS.EDIT;

    console.log(state, canSave());

    return {
        items: state.Routes.items,
        saved: isInEdit() ? {id: state.Routes.context.extra.routeId} : {},
        isSaving: canSave() ? state.Routes.context.extra.isSaving : false,
        error: state.Routes.error
    };
};

const RouteTrace = ReactRedux.connect(mapStateToProps)(RouteList);

module.exports = RouteTrace;