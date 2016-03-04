/**
 * Created by User on 03.03.2016.
 */
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

const CLEAR_ROUTE_LIST = 'CLEAR_ROUTE_LIST';
const clearRouteList = function ()
{
    return {
        type: CLEAR_ROUTE_LIST
    };
};

module.exports = {
    addRouteItem,
    ADD_ROUTE_ITEM,
    clearRouteList,
    CLEAR_ROUTE_LIST
};
