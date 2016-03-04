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

        default:
            return state;
    }
}

module.exports = user;