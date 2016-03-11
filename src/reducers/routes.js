/**
 * Created by User on 03.03.2016.
 */
var Actions = require('../actions/routes');
var Properties = require('../const/properties');

function routes(state = {
    items: [],
    //isSaving: false,
    //saved: {},
    error: {},
    polyLine: [],
    // Этот контекст определяет способ взаимодействия пользователя с компонентом (просмотр, редактирование, создание...)
    // extra содержит особые (необщие) параметры (например, id маршрута для редактирования...)
    context: {
        current: Properties.ROUTE.CONTEXTS.WATCH,
        extra: {isSaving: false}
    }
}, action)
{
    const canSave = () =>
        state.context.current == Properties.ROUTE.CONTEXTS.CREATE ||
        state.context.current == Properties.ROUTE.CONTEXTS.EDIT;

    switch(action.type)
    {
        case Actions.ADD_ROUTE_ITEM_TO_LIST:
            return state.items.length + 1 <= Properties.ROUTE.LIST.MAX_NUMBER
                ? Object.assign({}, state, {items: state.items.concat([action.payload.entertainment])})
                : state;

        case Actions.CLEAR_ROUTE_LIST:
            return Object.assign({}, state, {
                items: [],
                /*saved: {},*/
                error: {},
                /*isSaving: false,*/
                polyLine: []
            });

        case Actions.SAVE_ROUTE_LIST_BEGIN:
            return canSave()
                ? Object.assign({}, state, {
                    /*isSaving: true,*/
                    error: {},
                    context: Object.assign({}, state.context, {isSaving: true})
                    /*saved: {}*/})
                : state;


        /*case Actions.SAVE_ROUTE_LIST_VALIDATE:
            return Object.assign({}, state, {
                //isSaving: false, saved: action.payload.savedRouteList,
                error: {},
                context: Object.assign({}, state.context, {
                    isSaving: false,
                    routeId: action.payload.savedRouteList.id
                })
            });*/

        case Actions.SAVE_ROUTE_LIST_ERROR:
            return Object.assign({}, state, {
                /*isSaving: false,*/
                error: action.error,
                context: Object.assign({}, state.context, {
                    isSaving: false
                })
                /*saved: {}*/
            });

        case Actions.SET_CONTEXT:
            var extra = {};

            switch (action.payload.context.current)
            {
                case Properties.ROUTE.CONTEXTS.CREATE:
                    extra = {
                        isSaving: false
                    };
                    break;
                case Properties.ROUTE.CONTEXTS.EDIT:
                    extra = {
                        isSaving: false,
                        routeId: action.payload.context.extra.routeId
                    };
                    break;
                case Properties.ROUTE.CONTEXTS.WATCH:
                default:
                    extra = {
                        routeId: action.payload.context.extra.routeId
                    };
                    break;
            }

            return Object.assign({}, state, {
                context: {
                    current: action.payload.context.current,
                    extra
                }
            });

        case Actions.SET_POLYLINE:
            return Object.assign({}, state, {polyLine: action.payload.polyLine});

        default:
            return state;
    }
}

module.exports = routes;