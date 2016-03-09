/**
 * Created by User on 03.03.2016.
 */
var Properties = require('../const/properties');
var Polyline = require('polyline');

const ADD_ROUTE_ITEM_TO_LIST = 'ADD_ROUTE_ITEM_TO_LIST';
const addRouteItemToList = function (entertainment)
{
    return {
        type: ADD_ROUTE_ITEM_TO_LIST,
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

const SET_CONTEXT = 'SET_CONTEXT';
const setContext = function (context, extra)
{
    return {
        type: SET_CONTEXT,
        payload: {
            context: {
                current: context,
                extra
            }
        }
    };
};

const SET_POLYLINE = 'SET_POLYLINE';
const setPolyLine = function (polyLine)
{
    return {
        type: SET_POLYLINE,
        payload: {
            polyLine
        }
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

/**
 * Добавляет заведение к дорожному листу и вычисляет маршрут
 * @param routeItem заведение, которое нужно добавить
 * @param items предыдущие заведения, которые уже лежат в дорожном листе
 * @returns {Function} action creator ;)
 */
const addRouteItem = function(routeItem, items)
{
    return (dispatch) =>
    {
        dispatch(addRouteItemToList(routeItem));

        // Если меньше 2 заведений в маршруте, то нет смысла строить путь.
        if (items.length + 1 < 2) return;

        // Маршрут рассчитываем уже включая добавляемое заведение
        items.push(routeItem);

        var query = items
            .map(ent => (ent.latitude + ',' + ent.longitude))
            .join('&loc=');

        return fetch("http://router.project-osrm.org/viaroute?loc=" + query)
            .then(response => response.json())
            .then(json => {
                var decoded = Polyline.decode(json.route_geometry);
                console.log("OSRM received, path updated.");

                // TODO: find out why the hell / 10 ?
                dispatch(setPolyLine(
                    decoded.map(point => {
                        return {lat: point[0] / 10, lon: point[1] / 10}
                    })
                ));
            });
    }
};

module.exports = {
    ADD_ROUTE_ITEM_TO_LIST,
    CLEAR_ROUTE_LIST,
    SET_CONTEXT,
    SET_POLYLINE,
    SAVE_ROUTE_LIST_BEGIN,
    SAVE_ROUTE_LIST_VALIDATE,
    SAVE_ROUTE_LIST_ERROR,
    saveRouteList,
    clearRouteList,
    addRouteItem,
    setContext
};
