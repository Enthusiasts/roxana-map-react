/**
 * Created by debal on 02.03.2016.
 */
var _ = require('underscore');
var Actions = require('../actions/entertainments');
var Properties = require('../const/properties');

function entertainments(state = {
    isFetching: false,
    naturalTypes: [],
    clusters: {
        cost: {
            values: []
        },
        like: {
            values: []
        },
        checkin: {
            values: []
        }
    },
    points: {}
}, action) {

    switch (action.type) {
        case Actions.REQUEST_ENTERTAINMENTS:
            return Object.assign({}, state, {isFetching: true});

        /*case Actions.ADD_PARTICULAR_ENTERTAINMENTS:

         //Очень страшный по перформансу костыль
         // TODO: Бейте меня палками пока не уберу это!!!

         var what = state.Entertainments;
         var from = _.indexBy([].concat(state.cafe, state.restaurant, state.bar, state.club), 'id');

         var toAdd = what.filter(x => from[x.id]);

         return state;*/

        case Actions.RECEIVE_ENTERTAINMENTS:
            var t = _.mapObject(
                _.groupBy(action.payload.entertainments, 'type_en'),
                x => _.indexBy(x, 'id')
            );
            return {
                ...state,
                points: {
                    ...state.points,
                    ...t
                }
            };

        case Actions.ERROR_ENTERTAINMENTS:
            return state;

        case Actions.SHOW_NATURAL_TYPE:
            var index = state.naturalTypes.indexOf(action.payload.naturalType);
            if (index == -1) {
                if (!action.payload.isShowing) return state;
                return {
                    ...state,
                    naturalTypes: [...state.naturalTypes, action.payload.naturalType]
                }
            }

            if (!action.payload.isShowing) {
                var arr = [...state];
                arr.splice(index, 1);
                return {
                    ...state,
                    naturalTypes: arr
                }
            }
            return state;

        case Actions.SHOW_CLUSTER_TYPE:
            if (!action.payload.isShowing) {
                var copy = {...state.clusters};
                delete copy[action.payload.clusterType];
                return {
                    ...state,
                    clusters: copy
                }
            }
            return {
                ...state,
                clusters: {
                    ...state.clusters,
                    [action.payload.clusterType]: {
                        ...state.clusters[action.payload.clusterType],
                        values: action.payload.values
                    }
                }
            };

        default:
            return state;
    }
}

module.exports = entertainments;