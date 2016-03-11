/**
 * Created by debal on 03.03.2016.
 */
var Redux = require('redux');
var Thunk = require('redux-thunk');
var Entertainments = require('./reducers/entertainments');
var Routes = require('./reducers/routes');
var User = require('./reducers/user');
var History = require('./reducers/history');

const rootReducer = Redux.combineReducers({
    User,
    Entertainments,
    Routes,
    History
});

function configureStore(initialState)
{
    return Redux.createStore(
        rootReducer,
        initialState,
        Redux.applyMiddleware(Thunk)
    );
}

module.exports = configureStore;