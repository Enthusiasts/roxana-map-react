/**
 * Created by debal on 11.03.2016.
 */
var Properites = require('../const/properties');

var RouteActions = require('./routes');

const FETCH_USER_HISTORY_BEGIN = 'FETCH_USER_HISTORY_BEGIN';
const fetchUserHistoryBegin = function()
{
    return {
        type: FETCH_USER_HISTORY_BEGIN
    };
};

const FETCH_USER_HISTORY_VALIDATE = 'FETCH_USER_HISTORY_VALIDATE';
const fetchUserHistoryValidate = function(items)
{
    return {
        type: FETCH_USER_HISTORY_VALIDATE,
        payload: {
            savedRoutes: items
        }
    };
};

const fetchUserHistory = function(userId)
{
    return (dispatch) =>
    {
        dispatch(fetchUserHistoryBegin());

        //TODO: handle with userId
        return fetch(Properites.API.ROOT + 'routes/')
            .then(response => response.json())
            .then(
                json =>
                {
                    var routes = json._embedded.routes;
                    console.log("History: " + json.page.totalElements + " found, " + json.page.size + " received.");
                    dispatch(fetchUserHistoryValidate(routes));
                }
            );
    }
};

const editRoute = (routeId) => _loadRoute(routeId, Properites.ROUTE.CONTEXTS.EDIT);
const watchRoute = (routeId) => _loadRoute(routeId, Properites.ROUTE.CONTEXTS.WATCH);
const _loadRoute = function(routeId, context)
{
    return (dispatch) =>
    {
        return fetch(Properites.API.ROOT + 'routes/' + routeId + '/entertainments/')
            .then(response => response.json())
            .then(
                json =>
                {
                    var items = json._embedded.entertainments;
                    // Рисуем маршрут на карте и вносим его в менюшку
                    dispatch(RouteActions.setRouteListAndRenderPath(items));
                    // Меняем контекст менюшки на просмотр
                    dispatch(RouteActions.setContext(context, {routeId}));

                    console.log("Route with id '" + routeId + "' loaded for '" + context + "'.");
                }
            );
    };
};

const DELETE_HISTORY_ITEM = "DELETE_HISTORY_ITEM";
const deleteHistoryItem = function (routeId)
{
    return {
        type: DELETE_HISTORY_ITEM,
        payload: {
            routeId
        }
    };
};

const deleteRouteAndUpdateHistory = function(routeId)
{
    return (dispatch) =>
    {
        return fetch(Properites.API.ROOT + 'routes/' + routeId, {method: 'DELETE', mode: 'same-origin'})
            .then(
                response =>
                {
                    dispatch(deleteHistoryItem(routeId));
                    console.log("Route with id '" + routeId + "' deleted.");
                }
            );
    };
};

const FETCH_ROUTE_SUMMARY_VALIDATE = 'FETCH_ROUTE_SUMMARY_VALIDATE';
const fetchRouteSummaryValidate = function(routeId, summary)
{
    return {
        type: FETCH_ROUTE_SUMMARY_VALIDATE,
        payload: {
            routeId,
            summary
        }
    }
};

const fetchRouteSummary = function(route)
{
    return (dispatch) =>
    {
        const takePart = (link) => fetch(link).then(response => response.json());

        return Promise.all([takePart(route._links.first.href), takePart(route._links.last.href)])
            .then(
                (values) =>
                {
                    dispatch(fetchRouteSummaryValidate(route.id, {first: values[0], last: values[1]}));
                }
            );
    }
};

module.exports = {
    FETCH_USER_HISTORY_BEGIN,
    FETCH_USER_HISTORY_VALIDATE,
    DELETE_HISTORY_ITEM,
    FETCH_ROUTE_SUMMARY_VALIDATE,
    fetchUserHistory,
    fetchRouteSummary,
    editRoute,
    watchRoute,
    deleteRouteAndUpdateHistory
};