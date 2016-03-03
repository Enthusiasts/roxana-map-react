/**
 * Created by User on 03.03.2016.
 */
var Actions = require('../actions/routes');

function routes(state = {
    isAuthorized: false,
    items: []
}, action)
{
    /*
    console.log("Routes reduced \n State:");
    console.log(state);
    console.log("Action:");
    console.log(action);
    */
    switch(action.type)
    {
        case Actions.ADD_ROUTE_ITEM:
            return Object.assign({}, state, {items: state.items.concat([action.payload.entertainment])});

        default:
            return state;
    }
}

module.exports = routes;