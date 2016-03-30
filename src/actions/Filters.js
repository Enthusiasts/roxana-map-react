/**
 * Created by User on 30.03.2016.
 */
var Properties = require('../const/properties');



const POINT_COUNT = 'POINT_COUNT';
const setCountPoints = function (pointNumber) {
    return {
        type: POINT_COUNT,
        payload:{
            point: pointNumber
        }
    };
};

const SET_CHECKBOX = 'SET_CHECKBOX';
const setCheckBoxValue = function (name, value) {
    return {
        type: SET_CHECKBOX,
        payload:{
            name,
            value
        }
    };
};


module.exports = {

    POINT_COUNT,
    SET_CHECKBOX,
    setCountPoints,
    setCheckBoxValue

};