/**
 * Created by debal on 04.03.2016.
 */
var Actions = require('../actions/user');
var Properties = require('../const/properties');

function user(state = {
    isAuthorized: false,
    userInfo: {
        id: -1,
        url: "",
        image: "",
        login: "",
        name: "",
        photosCount: 0,
        followersCount: 0
    },
    location: {
        latitude: Properties.MAP.CENTER.LATITUDE,
        longitude: Properties.MAP.CENTER.LONGITUDE
    },
    popUps: {
        startPointPopUpActive: {
            active: false,
            latitude: null,
            longitude: null
        }
    },
    likedEntIds: [],
    likedRouteIds: []

}, action)
{
    switch(action.type)
    {
        case Actions.SET_AUTHORIZED:
            return Object.assign({}, state, {isAuthorized: action.payload.isAuthorized});

        case Actions.SET_USERINFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    ...action.payload.userInfo
                },
                likedEntIds: [...action.payload.likedEntertainments],
                likedRouteIds: [...action.payload.likedRoutes]
            };

        case Actions.SET_LOCATION:
            return Object.assign({}, state, {
                location: { latitude: action.payload.lat, longitude: action.payload.lon }
            });

        case Actions.START_POINT_POPUP_ACTIVE:
            return Object.assign({}, state, {
                popUps: Object.assign({}, state.popUps, {
                    startPointPopUpActive: action.payload
                })
            });

        case Actions.LIKE_ENT:
            var index = state.likedEntIds.indexOf(action.payload.id);
            if (action.payload.isUnlike) {
                if (index < 0) return state;
                // copy
                var arr = state.likedEntIds.splice();
                // remove 1 elem from index
                arr.splice(index, 1);
                return {
                    ...state,
                    likedEntIds: arr
                }
            }
            if (index >= 0) return state;
            return {
                ...state,
                likedEntIds: [...state.likedEntIds, action.payload.id]
            };

        default:
            return state;
    }
}

module.exports = user;