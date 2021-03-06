/**
 * Created by User on 03.03.2016.
 */
var Properties = require('../const/properties');
var Polyline = require('polyline');
var _ = require('underscore');
var Entertainments = require('./entertainments');

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
    return function (dispatch, getState) {
        dispatch(Entertainments.markAsWayPoint(false, getState().Routes.items.map(x =>x.id)));
        dispatch({type: CLEAR_ROUTE_LIST});

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

        if (!routeList || !routeList.entertainments) {
            dispatch(saveRouteListError('Произошла ошибка :('));
            console.error('Wrong entertainments definition');
            return;
        }

        if (routeList.entertainments.length < 2) {
            dispatch(saveRouteListError('Слишком мало выбранных заведений :('));
            return;
        }

        var entertainmentUris = routeList.entertainments
            .map(ent => Properties.API.ROOT + 'entertainments/' + ent.id);

        //var owner = {id: routeList.userId};
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

        if (routeList.entertainments.length < 2) {
            dispatch(saveRouteListError('Слишком мало выбранных заведений :('));
            return;
        }

        var entertainmentUris = routeList.entertainments
            .map(ent => Properties.API.ROOT + 'entertainments/' + ent.id);

        //var owner = {id: routeList.userId};
        var owner = Properties.API.ROOT + 'clients/' + routeList.userId

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

const updatePolyLine = function (input) {
    return (dispatch, getState) => {
        var points = input.slice();
        points.forEach(x => x["type_en"] = Properties.ENTERTAINMENT.TYPE.CHEAT);
        //dispatch(Entertainments.markAsWayPoint(true, getState().Routes.items.map(x => x.id)));
        dispatch(Entertainments.receiveEntertainments([], points));
        dispatch(Entertainments.setFocus(points.map(x => {
            return {lat: x.latitude, lng: x.longitude}
        })));

        dispatch(Entertainments.setFocus());
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

const offerRouteList = function (lat, lon) {
    return (dispatch, getState) => {
        var state = getState();
        var routeFilter = state.Filter;

        var naturalTypes = state.Entertainments.naturalTypes.length > 0
            ? state.Entertainments.naturalTypes.map(x => Properties.ENTERTAINMENT.TYPE.translate(x))
            : Properties.ENTERTAINMENT.TYPE.ALL_RU;

        if (!lat || !lon) {
            lat = state.User.location.latitude;
            lon = state.User.location.longitude;
        }

        var query = "?lat=" + lat + "&lon=" + lon + "&type=" + naturalTypes.join("&type=");
        if (routeFilter.points) query += "&points=" + routeFilter.points;
        if (routeFilter.rebuild) query += "&rebuild=" + routeFilter.rebuild;
        if (routeFilter.useLikes) query += "&useLikes=" + routeFilter.useLikes;
        if (routeFilter.useCost) query += "&useCost=" + routeFilter.useCost;
        if (routeFilter.useNear) query += "&useNear=" + routeFilter.useNear;

        // TODO: remade :(
        var clusters = state.Entertainments.clusters;
        function cartesianProductOf() {
            return _.reduce(arguments, function(a, b) {
                return _.flatten(_.map(a, function(x) {
                    return _.map(b, function(y) {
                        return x.concat([y]);
                    });
                }), true);
            }, [ [] ]);
        };
        const num = [1, 2, 3, 4];
        var clusterValuesCartesian = cartesianProductOf(
            clusters.cost.values.length > 0 ? clusters.cost.values : num.slice(),
            clusters.like.values.length > 0 ? clusters.like.values : num.slice(),
            clusters.checkin.values.length > 0 ? clusters.checkin.values : num.slice());
        var clustersQuery = clusterValuesCartesian.map(x => x.reduce((a, b) => a.toString() + b.toString()));

        query += "&cluster=" + clustersQuery.join('&cluster=');

       // console.log(query);

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
                        var temp = sliced.map(x => {
                            return {lat: x.latitude, lng: x.longitude}
                        });
                        //console.log(temp);
                        dispatch(Entertainments.setFocus(temp));
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

const moveItemAndRenderPath = function (items, up, id) {
    return (dispatch) => {
        var arr = items.slice();
        var index = arr.findIndex(x => x.id == id);

        var temp = arr[index];
        if (up) {
            if (index == 0) return;
            arr[index] = arr[index - 1];
            arr[index - 1] = temp;
        } else {
            if (index == arr.length - 1) return;
            arr[index] = arr[index + 1];
            arr[index + 1] = temp;
        }

        dispatch(setRouteList(arr));
        dispatch(updatePolyLine(arr));
    }
};

const removeItemAndRenderPath = function (items, id) {
    return (dispatch) => {
        if (items.length <= 1) {
            dispatch(clearRouteList());
            return;
        }

        var index = items.findIndex(x => x.id == id);
        var arr = items.slice();

        if (index == 0) {
            arr.splice(0, 1);
        }
        else if (index == items.length - 1) {
            arr.splice(index, 1);
        }
        else {
            arr.splice(index, 1);
        }

        dispatch(setRouteList(arr));
        dispatch(updatePolyLine(arr));
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
    offerRouteList,
    moveItemAndRenderPath,
    removeItemAndRenderPath
};
