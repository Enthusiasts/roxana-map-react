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
    points: {},
    focus: {
        latitude: Properties.MAP.CENTER.LATITUDE,
        longitude: Properties.MAP.CENTER.LONGITUDE,
        zoom: Properties.MAP.ZOOM,
        focusPoints: []
    },
    searchEnt: {
        searching: false,
        hasResp: false,
        candidates: []
    }
}, action) {

    const findEntertainment =  function (id){
        for (var i=0; i< Properties.ENTERTAINMENT.TYPE.ALL_EN.length; i++ ){

            var key = Properties.ENTERTAINMENT.TYPE.ALL_EN[i];
            var temp = state.points[key];
            if (!temp) continue;
            var temp1 = temp[id];
            if (temp1){
                return temp1
            }
        }
        return null
    };

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
        case Actions.MARK_AS_WAY_POINT:
            var ent = [];
            for (var i = 0; i< action.payload.ids.length; i++){
                var candidate = findEntertainment(action.payload.ids[i]);
                if (candidate) {
                    ent.push({...candidate, marked: action.payload.is});
                }
            }
            if (ent.length<=0) return state;
            return {
                ...state,
                points: {
                    ...state.points,
                    ..._.indexBy(ent, "id")
                }
            };
        case Actions.SET_FOCUS:
            return {
                ...state,
                focus: {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    zoom: action.payload.zoom,
                    focusPoints: action.payload.focusPoints
                }
            };
        case Actions.SEARCH_ENT_REQ:
            return {
                ...state,
                searchEnt: {
                    searching: true,
                    hasResp: false
                }
            };
        case Actions.SEARCH_ENR_RES:
            if (action.payload.entName === ''){
                return {
                    ...state,
                    searchEnt: {
                        searching: false,
                        hasResp: false,
                        candidates: action.payload.candidates
                    }
                };
            }
            else {
                return {
                    ...state,
                    searchEnt: {
                        searching: false,
                        hasResp: true,
                        candidates: action.payload.candidates
                    }
                };
            }
        default:
            return state;
    }
}

module.exports = entertainments;