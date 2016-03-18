/**
 * Created by debal on 04.03.2016.
 */
var Properties = require('../const/properties');

const SET_AUTHORIZED = 'SET_AUTHORIZED';
const setAuthorized = function (isAuthorized) {
    return {
        type: SET_AUTHORIZED,
        payload: {
            isAuthorized
        }
    };
};

const SET_USERINFO = 'SET_USERINFO';
const setUserInfo = function (userInfo) {
    return {
        type: SET_USERINFO,
        payload: {
            userInfo
        }
    };
};

const SET_LOCATION = "SET_LOCATION";
const setLocation = function (lat, lon) {
    return {
        type: SET_LOCATION,
        payload: {
            lat,
            lon
        }
    };
};

const SET_START_LOCATION = "SET_START_LOCATION";
const setStartLocation = function (lat, lon) {
    return {
        type: SET_START_LOCATION,
        payload: {
            lat,
            lon
        }
    };
};
const START_POINT_POPUP_ACTIVE = "START_POINT_POPUP_ACTIVE";
const startPointPopUpActive = function (active, latitude, longitude) {
    return {
        type: START_POINT_POPUP_ACTIVE,
        payload: {
            active,
            latitude,
            longitude
        }
    };
};

const fetchUserData = function () {
    return (dispatch) => {
        return fetch(Properties.API.USER, {
            method: 'GET',
            headers: {
                Accept: "application/json"
            },
            mode: "same-origin",
            credentials: "same-origin"
        })
            .then(response => {
                if (!response.ok) throw new Error("Not authorized");
                return response.json();
            })
            .then(json => {
                var useful = json.details.data;
                var profile = {
                    id: json.client.id,
                    url: "https://instagram.com/" + useful.username,
                    image: useful.profile_picture,
                    login: useful.username,
                    name: useful.full_name,
                    photosCount: useful.counts.media,
                    followersCount: useful.counts.followed_by
                };

                console.log("Authorization success!", profile);
                dispatch(setAuthorized(true));
                dispatch(setUserInfo(profile));
            })
            .catch(e => {
                console.log("Authorization failed :(");
                console.error(e);
                dispatch(setAuthorized(false));
            })
    }
};

module.exports = {
    SET_AUTHORIZED,
    SET_USERINFO,
    SET_LOCATION,
    SET_START_LOCATION,
    START_POINT_POPUP_ACTIVE,
    setAuthorized,
    setUserInfo,
    setLocation,
    setStartLocation,
    startPointPopUpActive,
    fetchUserData
};