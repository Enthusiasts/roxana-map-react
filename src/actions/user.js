/**
 * Created by debal on 04.03.2016.
 */
var Properties = require('../const/properties');

const SET_AUTHORIZED = 'SET_AUTHORIZED';
const setAuthorized = function (isAuthorized)
{
    return {
        type: SET_AUTHORIZED,
        payload: {
            isAuthorized
        }
    };
};

const SET_USERINFO = 'SET_USERINFO';
const setUserInfo = function (userInfo)
{
    return {
        type: SET_USERINFO,
        payload: {
            userInfo
        }
    };
};

module.exports = {
    SET_AUTHORIZED,
    setAuthorized,
    SET_USERINFO,
    setUserInfo
};