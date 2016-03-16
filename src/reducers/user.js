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
    }
}, action)
{
    switch(action.type)
    {
        case Actions.SET_AUTHORIZED:
            return Object.assign({}, state, {isAuthorized: action.payload.isAuthorized});

        case Actions.SET_USERINFO:
            return Object.assign({}, state, {
                userInfo: Object.assign({}, state.userInfo, action.payload.userInfo)
            });

        case Actions.SET_LOCATION:
            return Object.assign({}, state, {
                location: { latitude: action.payload.lat, longitude: action.payload.lon }
            });

        default:
            return state;
    }
}

module.exports = user;