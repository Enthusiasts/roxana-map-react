/**
 * Created by debal on 03.03.2016.
 */
var Redux = require('redux');
var Thunk = require('redux-thunk');
var EntertainmentsReducer = require('./reducers/entertainments');
var RoutesReducer = require('./reducers/routes');

function configureStore(initialState)
{
    return Redux.createStore(
        Redux.combineReducers(EntertainmentsReducer.entertainments, RoutesReducer.routes),
        initialState,
        Redux.applyMiddleware(Thunk)
    );
}

module.exports = configureStore;