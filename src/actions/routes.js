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

const CLEAR_ROUTE_LIST = 'CLEAR_ROUTE_LIST';
const clearRouteList = function ()
{
    return {
        type: CLEAR_ROUTE_LIST
    };
};

const SAVE_ROUTE_LIST_BEGIN = 'SAVE_ROUTE_LIST_BEGIN';
const saveRouteListBegin = function()
{
    return {
        type: SAVE_ROUTE_LIST_BEGIN
    };
};

const SAVE_ROUTE_LIST_VALIDATE = 'SAVE_ROUTE_LIST_VALIDATE';
const saveRouteListValidate = function(savedRouteList)
{
    return {
        type: SAVE_ROUTE_LIST_VALIDATE,
        payload: {
            savedRouteList
        }
    };
};

const SAVE_ROUTE_LIST_ERROR= 'SAVE_ROUTE_LIST_ERROR';
const saveRouteListError = function(reason)
{
    return {
        type: SAVE_ROUTE_LIST_ERROR,
        payload: new Error(),
        error: {
            reason
        }
    };
};

const saveRouteList = function (routeList)
{
    return (dispatch) =>
    {
        dispatch(saveRouteListBegin());

        if (!routeList || !routeList.entertainments || !(routeList.entertainments.length > 0))
        {
            dispatch(saveRouteListError('Произошла ошибка :('));
            console.error('Wrong entertainments definition');
            return;
        }

        var entertainmentUris = routeList.entertainments
            .map(ent => Properties.API.ROOT + 'entertainments/' + ent.id);

        var requestBody = {
            description: routeList.description,
            entertainments: entertainmentUris
        };

        return fetch(Properties.API.ROOT + 'routes/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'same-origin',
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(json => {
            console.log('Route with id \''+ json.id + '\' saved.');
            dispatch(saveRouteListValidate(json))
        })
        .catch(error => {
            console.error(error);
            dispatch(saveRouteListError('Произошла ошибка :('))
        })
}
};

module.exports = {
    addRouteItem,
    ADD_ROUTE_ITEM,
    clearRouteList,
    CLEAR_ROUTE_LIST,
    SAVE_ROUTE_LIST_BEGIN,
    SAVE_ROUTE_LIST_VALIDATE,
    SAVE_ROUTE_LIST_ERROR,
    saveRouteList
};
