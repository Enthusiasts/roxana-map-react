/**
 * Created by User on 30.03.2016.
 */


var Actions = require('../actions/filters');
var Properties = require('../const/properties');


function filter(
    state = {
    points: 5,
    rebuild: true,
    useLikes: true,
    useCost: true,
    useNear: true
}, action)
{
    switch(action.type){
        case Actions.POINT_COUNT:
            //console.log(state);
            return {
                ...state,
                points: action.payload.point
            };
        case Actions.SET_CHECKBOX:
            //console.log(state);
            //console.log(action);
            var tmp_val = {
                ...state
            };
            tmp_val[action.payload.name] = action.payload.value;

            return tmp_val;
        default:
            return state;
    }
}

module.exports = filter;