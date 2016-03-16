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

const SET_LOCATION = "SET_LOCATION";
const setLocation = function (lat, lon)
{
    return {
        type: SET_LOCATION,
        payload: {
            lat,
            lon
        }
    };
};

module.exports = {
    SET_AUTHORIZED,
    SET_USERINFO,
    SET_LOCATION,
    setAuthorized,
    setUserInfo,
    setLocation
};