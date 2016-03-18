/**
 * Created by debal on 04.03.2016.
 */
var Actions = require('../actions/user');
var Properties = require('../const/properties');

function user(state = {
    isAuthorized: false,
    userInfo: {
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
    }

}, action)
{
    switch(action.type)
    {
        case Actions.SET_AUTHORIZED:
            console.log(action);
            return Object.assign({}, state, {isAuthorized: action.payload.isAuthorized});

        case Actions.SET_USERINFO:
            console.log(action);
            return Object.assign({}, state, {
                userInfo: Object.assign({}, state.userInfo, action.payload.userInfo)
            });

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

        default:
            return state;
    }
}

module.exports = user;