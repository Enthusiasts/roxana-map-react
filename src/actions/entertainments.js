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
                                  values) {
   // if (from > to) console.warn("Cluster range cannot start from greater number :(", from, to);
    return {
        type: SHOW_CLUSTER_TYPE,
        payload: {
            clusterType,
            values,
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
const MARK_AS_WAY_POINT = 'MARK_AS_WAY_POINT';
const markAsWayPoint = function(is, ids){
    return {
        type: MARK_AS_WAY_POINT,
        payload: {
            is,
            ids
        }
    }
};
const SET_FOCUS = 'SET_FOCUS';
const setFocus = function(focusPoints, latitude, longitude, zoom){
    return {
        type: SET_FOCUS,
        payload: {
            latitude,
            longitude,
            zoom,
            focusPoints
        }
    }

};
const SEARCH_ENT_REQ = 'SEARCH_ENT_REQ';

const searchEntReq = function () {
    return {
        type: SEARCH_ENT_REQ
    }
};
const SEARCH_ENR_RES = 'SEARCH_ENR_RES';
const searchEntRes = function (entName,candidates){
    return {
        type: SEARCH_ENR_RES,
        payload: {
            entName,
            candidates
        }
    }
};
const searchEnt = function(entName){
    return function (dispatch){
        dispatch(searchEntReq());
        if (entName === '') {
            dispatch(searchEntRes(entName,[]))
        }
        else {
            return fetch(Properties.API.ROOT +'entertainments/search/findByTitleContent?content=' + entName)
                .then(response => response.json())
                .then(json => {
                    var candidates = json._embedded.entertainments.slice(0,5);
                    candidates.forEach(ent => {ent['type_en'] = Properties.ENTERTAINMENT.TYPE.CHEAT});
                    dispatch(searchEntRes(entName,candidates));
                });
        }
    }
};
const showEntFromSearchResult = function(ent){
    return function (dispatch, getState){
        var type = [ent.type_en];
        var place = [ent];
        console.log(type,place);
        dispatch(receiveEntertainments(type, place));
        dispatch(setFocus([],ent.latitude,ent.longitude, Properties.FOCUS.ZOOM));
        //console.log(getState());
    }
};
const DELETE_ENTERTAINMENTS = "DELETE_ENTERTAINMENTS";
const deleteEntertainments = function(ent){
    return {
        type: DELETE_ENTERTAINMENTS,
        payload: {
            ent
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
    MARK_AS_WAY_POINT,
    SET_FOCUS,
    SEARCH_ENT_REQ,
    SEARCH_ENR_RES,
    DELETE_ENTERTAINMENTS,
    errorEntertainments,
    fetchEntertainments,
    showNaturalTypeAndFetchEntertainments,
    showEntLikes,
    showClusterType,
    markAsWayPoint,
    setFocus,
    searchEntReq,
    searchEntRes,
    searchEnt,
    showEntFromSearchResult,
    receiveEntertainments,
    deleteEntertainments

    //addParticularEntertainments
};