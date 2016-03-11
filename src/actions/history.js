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
                    dispatch(fetchUserHistoryValidate(routes.map(
                        x =>
                            Object.assign({}, x, {first: {title: "pf"}, last: {title: "sd"}})
                    )));
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
    }
};

module.exports = {
    FETCH_USER_HISTORY_BEGIN,
    FETCH_USER_HISTORY_VALIDATE,
    fetchUserHistory,
    editRoute,
    watchRoute
};