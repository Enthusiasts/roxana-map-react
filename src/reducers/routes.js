/**
 * Created by User on 03.03.2016.
 */
var Actions = require('../actions/routes');
var Properties = require('../const/properties');

function routes(state = {
    isAuthorized: false,
    items: []
}, action)
{
    switch(action.type)
    {
        case Actions.ADD_ROUTE_ITEM:
            return state.items.length + 1 <= Properties.ROUTE.LIST.MAX_NUMBER
                ? Object.assign({}, state, {items: state.items.concat([action.payload.entertainment])})
                : state;

        case Actions.CLEAR_ROUTE_LIST:
            return {isAuthorized: false, items: []};

        default:
            return state;
    }
}

module.exports = routes;