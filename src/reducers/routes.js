/**
 * Created by User on 03.03.2016.
 */
var Actions = require('../actions/routes');
var Properties = require('../const/properties');

function routes(state = {
    items: [],
    isSaving: false,
    saved: {},
    error: {},
    polyLine: []
}, action)
{
    switch(action.type)
    {
        case Actions.ADD_ROUTE_ITEM_TO_LIST:
            return state.items.length + 1 <= Properties.ROUTE.LIST.MAX_NUMBER
                ? Object.assign({}, state, {items: state.items.concat([action.payload.entertainment])})
                : state;

        case Actions.CLEAR_ROUTE_LIST:
            return {items: [], saved: {}, error: {}, isSaving: false, polyLine: []};

        case Actions.SET_POLYLINE:
            return Object.assign({}, state, {polyLine: action.payload.polyLine});

        case Actions.SAVE_ROUTE_LIST_BEGIN:
            return Object.assign({}, state, {isSaving: true, error: {}, saved: {}});

        case Actions.SAVE_ROUTE_LIST_VALIDATE:
            return Object.assign({}, state, {isSaving: false, saved: action.payload.savedRouteList, error: {}});

        case Actions.SAVE_ROUTE_LIST_ERROR:
            return Object.assign({}, state, {isSaving: false, error: action.error.reason, saved: {}});

        default:
            return state;
    }
}

module.exports = routes;