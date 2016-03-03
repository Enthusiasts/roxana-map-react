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
            return Object.assign({}, state, {items: this.state.items.append(action.payload.entertainment)});
        /*{
         isFetching: true,
         cafe: state.cafe,
         restaurant: state.restaurant,
         bar: state.bar,
         club: state.club
         };*/

        default:
            return state;
    }
}

module.exports = {
    routes
};