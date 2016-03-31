/**
 * Created by debal on 02.03.2016.
 */
var Properties = require('../const/properties');

const REQUEST_ENTERTAINMENTS = 'GET_ENTERTAINMENTS';
const requestEntertainments = function () {
    return {
        type: REQUEST_ENTERTAINMENTS
    };
};

const RECEIVE_ENTERTAINMENTS = 'RECEIVE_ENTERTAINMENTS';
const receiveEntertainments = function (naturalTypes, entertainments) {
    return {
        type: RECEIVE_ENTERTAINMENTS,
        payload: {
            naturalTypes,
            entertainments,
            receivedAt: Date.now()
        }
    };
};

const ERROR_ENTERTAINMENTS = 'ERROR_ENTERTAINMENTS';
const errorEntertainments = function (entertainmentsType) {
    return {
        type: ERROR_ENTERTAINMENTS,
        payload: new Error(),
        error: 'Невозможно загрузить заведения "' + entertainmentsType + '" :('
    };
};
/*
 const ADD_PARTICULAR_ENTERTAINMENTS = 'ADD_PARTICULAR_ENTERTAINMENTS';
 const addParticularEntertainments = function (ids)
 {
 return {
 type: ADD_PARTICULAR_ENTERTAINMENTS,
 payload: {
 ids
 }
 };
 };*/

const SHOW_NATURAL_TYPE = 'SHOW_NATURAL_TYPE';
const showNaturalType = function (naturalType, isShowing = true) {
    return {
        type: SHOW_NATURAL_TYPE,
        payload: {
            naturalType,
            isShowing
        }
    };
};

const SHOW_CLUSTER_TYPE = 'SHOW_CLUSTER_TYPE';
const showClusterType = function (clusterType,
                                  isShowing = true,
                                  from = Properties.CLUSTER.min(clusterType),
                                  to = Properties.CLUSTER.max(clusterType)) {
    if (from > to) console.warn("Cluster range cannot start from greater number :(", from, to);
    return {
        type: SHOW_CLUSTER_TYPE,
        payload: {
            clusterType,
            from,
            to,
            isShowing
        }
    };
};

const SHOW_ENT_LIKES = 'SHOW_ENT_LIKES';
const showEntLikes = function () {
    return {
        type: SHOW_ENT_LIKES,
        payload: {
            likesNum
        }
    }
}

const fetchEntertainments = (naturalTypes) => {
    return (dispatch, getState) => {
        dispatch(requestEntertainments());

        var Entertainments = getState().Entertainments;
        if (!naturalTypes) naturalTypes = Entertainments.naturalTypes;
        var clusterTypes = Object.keys(Entertainments.clusters);

        var query = naturalTypes.map(x => Properties.ENTERTAINMENT.TYPE.translate(x)).join("&type=");
        return fetch(Properties.API.ROOT + "entertainments/search/findByTypeIn?type=" + query)
            .then(
                response =>
                    response.json()
            )
            .then(
                json => {
                    var ents = json._embedded.entertainments;
                    ents.forEach(x => {
                        if (!Properties.ENTERTAINMENT.TYPE.RU2EN[x.type]) return;
                        x['type_en'] = Properties.ENTERTAINMENT.TYPE.RU2EN[x.type];
                    });
                    dispatch(receiveEntertainments(naturalTypes, ents));
                }
            );
    }
};

const showNaturalTypeAndFetchEntertainments = (naturalType, isShowing) => {
    return (dispatch, getState) => {
        var fetched = getState().Entertainments.naturalTypes;

        dispatch(showNaturalType(naturalType, isShowing));
        if (fetched.indexOf(naturalType) == -1) {
            dispatch(fetchEntertainments([naturalType]));
        }
    }
};


module.exports = {
    REQUEST_ENTERTAINMENTS,
    RECEIVE_ENTERTAINMENTS,
    ERROR_ENTERTAINMENTS,
    //ADD_PARTICULAR_ENTERTAINMENTS,
    SHOW_NATURAL_TYPE,
    SHOW_CLUSTER_TYPE,
    SHOW_ENT_LIKES,
    errorEntertainments,
    fetchEntertainments,
    showNaturalTypeAndFetchEntertainments,
    showEntLikes
    //addParticularEntertainments
};