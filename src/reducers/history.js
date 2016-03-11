/**
 * Created by debal on 11.03.2016.
 */
var Properties = require('../const/properties');
var Actions = require('../actions/history');

function history(state = {
    savedRoutes: []
}, action)
{
    switch(action.type)
    {
        case Actions.FETCH_USER_HISTORY_BEGIN:
            return state;

        case Actions.FETCH_USER_HISTORY_VALIDATE:
            return Object.assign({}, state, {savedRoutes: action.payload.savedRoutes});

        case Actions.DELETE_HISTORY_ITEM:
            var savedRoutes = function() {
                var indexOf = state.savedRoutes.findIndex(x => x.id == action.payload.routeId);
                var newSavedRoutes = state.savedRoutes;
                if (indexOf >=0)
                {
                    newSavedRoutes = state.savedRoutes.slice();
                    newSavedRoutes.splice(indexOf, 1);
                }
                return newSavedRoutes
            };
            return Object.assign({}, state, {savedRoutes: savedRoutes()});

        case Actions.FETCH_ROUTE_SUMMARY_VALIDATE:
            var toReplace = state.savedRoutes.findIndex(x => x.id == action.payload.routeId);
            var t = state.savedRoutes.slice();
            if (toReplace >= 0)
            {
                t[toReplace] = Object.assign({}, t[toReplace], {
                    first: action.payload.summary.first,
                    last: action.payload.summary.last
                });
            }
            return Object.assign({}, state, t);

        default:
            return state;
    }
}

module.exports = history;