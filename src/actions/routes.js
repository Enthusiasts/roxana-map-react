/**
 * Created by User on 03.03.2016.
 */
var Properties = require('../const/properties');
var Polyline = require('polyline');

const ADD_ROUTE_ITEM = 'ADD_ROUTE_ITEM';
const addRouteItem = function (entertainment) {
    return {
        type: ADD_ROUTE_ITEM,
        payload: {
            entertainment
        }
    };
};

const SET_ROUTE_LIST = 'SET_ROUTE_LIST';
const setRouteList = function (entertainments) {
    return {
        type: SET_ROUTE_LIST,
        payload: {
            items: entertainments
        }
    };
};


const CLEAR_ROUTE_LIST = 'CLEAR_ROUTE_LIST';
const clearRouteList = function () {
    return {
        type: CLEAR_ROUTE_LIST
    };
};

const clearRouteListAndSetCreateContext = function () {
    return (dispatch) => {
        dispatch(clearRouteList());
        dispatch(setContext(Properties.ROUTE.CONTEXTS.CREATE, {}));
    }
};

const SET_CONTEXT = 'SET_CONTEXT';
const setContext = function (context, extra) {
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
const setPolyLine = function (polyLine) {
    return {
        type: SET_POLYLINE,
        payload: {
            polyLine
        }
    };
};

const SAVE_ROUTE_LIST_BEGIN = 'SAVE_ROUTE_LIST_BEGIN';
const saveRouteListBegin = function () {
    return {
        type: SAVE_ROUTE_LIST_BEGIN
    };
};


const SAVE_ROUTE_LIST_VALIDATE = 'SAVE_ROUTE_LIST_VALIDATE';
const saveRouteListValidate = function (content) {
    return {
        type: SAVE_ROUTE_LIST_VALIDATE,
        payload: {
            message: {
                content
            }
        }
    };
};

const SAVE_ROUTE_LIST_ERROR = 'SAVE_ROUTE_LIST_ERROR';
const saveRouteListError = function (reason) {
    return {
        type: SAVE_ROUTE_LIST_ERROR,
        payload: new Error(),
        error: {
            reason
        }
    };
};

const saveRouteListAndSetEditContext = function (routeList) {
    return (dispatch) => {

        if (!routeList || !routeList.entertainments || !(routeList.entertainments.length > 0)) {
            dispatch(saveRouteListError('Произошла ошибка :('));
            console.error('Wrong entertainments definition');
            return;
        }

        var entertainmentUris = routeList.entertainments
            .map(ent => Properties.API.ROOT + 'entertainments/' + ent.id);

        var owner = Properties.API.ROOT + 'clients/' + routeList.userId;

        var requestBody = {
            owner,
            description: routeList.description,
            first: entertainmentUris[0],
            last: entertainmentUris[entertainmentUris.length - 1],
            entertainments: entertainmentUris
        };

        _fetchRouteListAndSetEditContext(dispatch, "routes", requestBody, 'POST')
    }
};

const updateRouteListAndSetEditContext = function (id, routeList) {
    return (dispatch) => {

        if (!routeList || !routeList.entertainments || !(routeList.entertainments.length > 0)) {
            dispatch(saveRouteListError('Произошла ошибка :('));
            console.error('Wrong entertainments definition');
            return;
        }

        var entertainmentUris = routeList.entertainments
            .map(ent => Properties.API.ROOT + 'entertainments/' + ent.id);

        var owner = Properties.API.ROOT + 'clients/' + routeList.userId;

        var requestBody = {
            id,
            owner,
            description: routeList.description,
            first: entertainmentUris[0],
            last: entertainmentUris[entertainmentUris.length - 1],
            entertainments: entertainmentUris
        };

        _fetchRouteListAndSetEditContext(dispatch, 'routes/' + id, requestBody, 'PUT')
    }
};

const _fetchRouteListAndSetEditContext = function (dispatch, query, requestBody, method) {
    if (!method in ['POST', 'PUT']) throw new Error("Can only update and post :(");

    dispatch(saveRouteListBegin());

    return fetch(Properties.API.ROOT + query, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'same-origin',
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Unsuccesful");
            }
        })
        .then(json => {
            const routeId = json.id;
            console.log('Route with id \'' + routeId + '\' saved via \'' + method + '\'.');

            //Автоматически переводим в режим редактирования
            dispatch(setContext(Properties.ROUTE.CONTEXTS.EDIT, {routeId: routeId}));

            //Отправляем сообщеньку об успешнос сохранении
            dispatch(saveRouteListValidate("Маршрут успешно сохранён!"));
        })
        .catch(error => {
            console.error(error);
            dispatch(saveRouteListError('Произошла ошибка :('))
        })
};

/**
 * Добавляет заведение к дорожному листу и вычисляет маршрут
 * @param routeItem заведение, которое нужно добавить
 * @param items предыдущие заведения, которые уже лежат в дорожном листе
 * @returns {Function} thunk ;)
 */
const addRouteItemAndRenderPath = function (routeItem, items) {
    return (dispatch) => {
        dispatch(addRouteItem(routeItem));

        // Если меньше 2 заведений в маршруте, то нет смысла строить путь.
        if (items.length + 1 < 2) return;

        // Маршрут рассчитываем уже включая добавляемое заведение
        items.push(routeItem);

        dispatch(updatePolyLine(items));
    }
};

/**
 * Устанавливает дорожное заведние и вычисляет маршрут для карты.
 * Практически идентична addRouteItemAndRenderPath
 * @param items - заведения, которые загружаются в дорожную карту
 * @returns {Function} thunk :)
 */
const setRouteListAndRenderPath = function (items) {
    return (dispatch) => {
        dispatch(setRouteList(items));
        dispatch(updatePolyLine(items));
    }
};

const updatePolyLine = function (points) {
    return (dispatch) => {
        var query = points
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

const offerRouteList = function (lat, lon, types) {
    return (dispatch) => {
        var query = "?lat=" + lat + "&lon=" + lon + "&type=" + types.join("&type=");
        return fetch(Properties.API.ROUTES + "calculate" + query, {
            method: 'GET',
            mode: 'same-origin'
        })
            .then(response => response.json())
            .then(
                json => {
                    if (!(json instanceof Array)) throw new Error();

                    console.log("Loaded offered route: ", json);

                    //Маршрут может состоять только из ограниченного количества пунктов, поэтому срезаем
                    var sliced = json.slice(0, Properties.ROUTE.LIST.MAX_NUMBER);

                    if (sliced.length == 0) {
                        //TODO: message Извините нам нечего предложить :(
                    }
                    else {
                        dispatch(setContext(Properties.ROUTE.CONTEXTS.CREATE, {}));
                        dispatch(setRouteList(sliced));
                        // Хотим так же нарисовать линию от позиции юзер :)
                        var toPolyline = sliced.slice();
                        toPolyline.push({latitude: lat, longitude: lon});
                        dispatch(updatePolyLine(toPolyline));
                    }
                }
            )
            .catch(
                e => {
                    console.error("Error while loading offered route :(", e);
                }
            )
    }
};

module.exports = {
    ADD_ROUTE_ITEM,
    SET_ROUTE_LIST,
    CLEAR_ROUTE_LIST,
    SET_CONTEXT,
    SET_POLYLINE,
    SAVE_ROUTE_LIST_BEGIN,
    SAVE_ROUTE_LIST_VALIDATE,
    SAVE_ROUTE_LIST_ERROR,
    saveRouteListAndSetEditContext,
    updateRouteListAndSetEditContext,
    clearRouteListAndSetCreateContext,
    addRouteItemAndRenderPath,
    setRouteListAndRenderPath,
    setContext,
    offerRouteList
};
