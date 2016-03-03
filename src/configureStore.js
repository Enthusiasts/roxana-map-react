/**
 * Created by debal on 03.03.2016.
 */
var Redux = require('redux');
var Thunk = require('redux-thunk');
var EntertainmentsReducer = require('./reducers/entertainments');

function configureStore(initialState)
{
    return Redux.createStore(
        EntertainmentsReducer.entertainments,
        initialState,
        Redux.applyMiddleware(Thunk)
    );
}

module.exports = configureStore;