/**
 * Created by User on 03.03.2016.
 */
var Properties = require('../const/properties');

const ADD_ROUTE_ITEM = 'ADD_ROUTE_ITEM';
const addRouteItem = function (entertainment)
{
    return {
        type: ADD_ROUTE_ITEM,
        payload: {
            entertainment
        }
    };
};

module.exports={addRouteItem, ADD_ROUTE_ITEM};
