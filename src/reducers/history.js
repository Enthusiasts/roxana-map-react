/**
 * Created by debal on 11.03.2016.
 */
var Properties = require('../const/properties');
var Actions = require('../actions/history');

function history(state = {
    savedRoutes: []
}, action)
{

    console.log(action);
    switch(action.type)
    {
        case Actions.FETCH_USER_HISTORY_BEGIN:
            return state;

        case Actions.FETCH_USER_HISTORY_VALIDATE:
            return Object.assign({}, state, {savedRoutes: action.payload.savedRoutes});

        default:
            return state;
    }
}

module.exports = history;